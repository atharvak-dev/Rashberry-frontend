import { Component, createSignal } from 'solid-js';
import styles from './Upload.module.css';

const Upload: Component = () => {
    const [isDragging, setIsDragging] = createSignal(false);

    return (
        <div class={styles.container}>
            <header class={styles.header}>
                <h1 class={styles.title}>Create</h1>
                <p class={styles.subtitle}>Share your moment with the world</p>
            </header>

            <div
                class={styles.dropZone}
                classList={{ [styles.dragging]: isDragging() }}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    // Handle file drop
                }}
            >
                <div class={styles.dropContent}>
                    <span class={styles.uploadIcon}>📹</span>
                    <p class={styles.dropText}>Drag & drop your video here</p>
                    <p class={styles.dropSubtext}>or</p>
                    <button class={styles.selectButton}>
                        Select from device
                    </button>
                </div>
            </div>

            <div class={styles.guidelines}>
                <h3 class={styles.guidelinesTitle}>Upload Guidelines</h3>
                <ul class={styles.guidelinesList}>
                    <li>MP4 or WebM format</li>
                    <li>Up to 10 minutes long</li>
                    <li>Maximum 500MB file size</li>
                    <li>9:16 aspect ratio recommended</li>
                </ul>
            </div>
        </div>
    );
};

export default Upload;
