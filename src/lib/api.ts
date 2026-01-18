/**
 * Rashberry API Client
 * Connects the SolidJS frontend to the NestJS backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface AuthToken {
    accessToken: string;
}

interface User {
    id: string;
    email: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
}

interface AuthResponse {
    user: User;
    accessToken: string;
}

interface Video {
    id: string;
    title: string;
    description: string | null;
    thumbnailUrl: string | null;
    duration: number | null;
    viewCount: number;
    likeCount: number;
    status: 'pending' | 'processing' | 'ready' | 'failed';
    createdAt: string;
    user?: {
        id: string;
        username: string;
        displayName: string | null;
        avatarUrl: string | null;
    };
}

// Token storage
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
    authToken = token;
    if (token) {
        localStorage.setItem('rashberry_token', token);
    } else {
        localStorage.removeItem('rashberry_token');
    }
}

export function getAuthToken(): string | null {
    if (!authToken) {
        authToken = localStorage.getItem('rashberry_token');
    }
    return authToken;
}

// Base fetch wrapper
async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getAuthToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}

// Auth API
export const authApi = {
    async register(data: { email: string; username: string; password: string; displayName?: string }): Promise<AuthResponse> {
        const response = await apiFetch<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        setAuthToken(response.accessToken);
        return response;
    },

    async login(data: { email: string; password: string }): Promise<AuthResponse> {
        const response = await apiFetch<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        setAuthToken(response.accessToken);
        return response;
    },

    logout() {
        setAuthToken(null);
    },
};

// Users API
export const usersApi = {
    async getProfile(): Promise<User> {
        return apiFetch<User>('/users/me');
    },
};

// Videos API
export const videosApi = {
    async getFeed(limit = 20, offset = 0): Promise<Video[]> {
        return apiFetch<Video[]>(`/videos/feed?limit=${limit}&offset=${offset}`);
    },

    async getMyVideos(limit = 20, offset = 0): Promise<Video[]> {
        return apiFetch<Video[]>(`/videos/my-videos?limit=${limit}&offset=${offset}`);
    },

    async getVideo(id: string): Promise<Video> {
        return apiFetch<Video>(`/videos/${id}`);
    },

    async deleteVideo(id: string): Promise<void> {
        await apiFetch(`/videos/${id}`, { method: 'DELETE' });
    },
};

// Health API
export const healthApi = {
    async check(): Promise<{ status: string; timestamp: string }> {
        return apiFetch('/health');
    },
};

export type { User, Video, AuthResponse };
