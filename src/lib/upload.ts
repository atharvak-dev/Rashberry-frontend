/**
 * TUS Upload Service
 * Handles resumable video uploads using the TUS protocol
 */

import { getAuthToken } from './api';

const UPLOAD_ENDPOINT = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/upload`
    : 'http://localhost:3001/api/upload';

interface UploadProgress {
    bytesUploaded: number;
    bytesTotal: number;
    percentage: number;
}

interface UploadCallbacks {
    onProgress?: (progress: UploadProgress) => void;
    onSuccess?: (uploadUrl: string) => void;
    onError?: (error: Error) => void;
}

export class VideoUploader {
    private file: File;
    private uploadUrl: string | null = null;
    private abortController: AbortController | null = null;
    private callbacks: UploadCallbacks;

    constructor(file: File, callbacks: UploadCallbacks = {}) {
        this.file = file;
        this.callbacks = callbacks;
    }

    async start(): Promise<void> {
        this.abortController = new AbortController();

        try {
            // Step 1: Create upload
            await this.createUpload();

            // Step 2: Upload file in chunks
            await this.uploadChunks();

            this.callbacks.onSuccess?.(this.uploadUrl!);
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                this.callbacks.onError?.(error as Error);
            }
        }
    }

    abort(): void {
        this.abortController?.abort();
    }

    private async createUpload(): Promise<void> {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication required');
        }

        // TUS metadata as base64-encoded key-value pairs
        const metadata = [
            `filename ${btoa(this.file.name)}`,
            `filetype ${btoa(this.file.type)}`,
        ].join(',');

        const response = await fetch(UPLOAD_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Tus-Resumable': '1.0.0',
                'Upload-Length': this.file.size.toString(),
                'Upload-Metadata': metadata,
                'Content-Type': 'application/offset+octet-stream',
            },
            signal: this.abortController!.signal,
        });

        if (!response.ok) {
            throw new Error(`Upload creation failed: ${response.status}`);
        }

        this.uploadUrl = response.headers.get('Location');
        if (!this.uploadUrl) {
            throw new Error('No upload URL returned');
        }
    }

    private async uploadChunks(): Promise<void> {
        const token = getAuthToken();
        const chunkSize = 5 * 1024 * 1024; // 5MB chunks
        let offset = 0;

        while (offset < this.file.size) {
            const chunk = this.file.slice(offset, offset + chunkSize);

            const response = await fetch(this.uploadUrl!, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Tus-Resumable': '1.0.0',
                    'Upload-Offset': offset.toString(),
                    'Content-Type': 'application/offset+octet-stream',
                },
                body: chunk,
                signal: this.abortController!.signal,
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.status}`);
            }

            const newOffset = parseInt(response.headers.get('Upload-Offset') || '0');
            offset = newOffset;

            // Report progress
            this.callbacks.onProgress?.({
                bytesUploaded: offset,
                bytesTotal: this.file.size,
                percentage: Math.round((offset / this.file.size) * 100),
            });
        }
    }

    /**
     * Resume a previously interrupted upload
     */
    async resume(uploadUrl: string): Promise<void> {
        this.uploadUrl = uploadUrl;
        this.abortController = new AbortController();

        try {
            // Check current offset
            const token = getAuthToken();
            const headResponse = await fetch(uploadUrl, {
                method: 'HEAD',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Tus-Resumable': '1.0.0',
                },
            });

            if (!headResponse.ok) {
                throw new Error('Could not resume upload');
            }

            // Continue from last offset
            await this.uploadChunks();
            this.callbacks.onSuccess?.(this.uploadUrl);
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                this.callbacks.onError?.(error as Error);
            }
        }
    }
}

/**
 * Simple upload function for quick use
 */
export async function uploadVideo(
    file: File,
    onProgress?: (progress: UploadProgress) => void
): Promise<string> {
    return new Promise((resolve, reject) => {
        const uploader = new VideoUploader(file, {
            onProgress,
            onSuccess: resolve,
            onError: reject,
        });
        uploader.start();
    });
}

export type { UploadProgress, UploadCallbacks };
