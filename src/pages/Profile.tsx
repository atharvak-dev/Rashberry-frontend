import { Component } from 'solid-js';
import styles from './Profile.module.css';

const Profile: Component = () => {
    return (
        <div class={styles.container}>
            <div class={styles.header}>
                <div class={styles.avatar}>
                    <span class={styles.avatarPlaceholder}>👤</span>
                </div>
                <h1 class={styles.username}>@username</h1>
                <p class={styles.bio}>Your creative bio goes here ✨</p>

                <div class={styles.stats}>
                    <div class={styles.stat}>
                        <span class={styles.statValue}>0</span>
                        <span class={styles.statLabel}>Following</span>
                    </div>
                    <div class={styles.stat}>
                        <span class={styles.statValue}>0</span>
                        <span class={styles.statLabel}>Followers</span>
                    </div>
                    <div class={styles.stat}>
                        <span class={styles.statValue}>0</span>
                        <span class={styles.statLabel}>Likes</span>
                    </div>
                </div>

                <button class={styles.editButton}>Edit profile</button>
            </div>

            <div class={styles.content}>
                <div class={styles.tabs}>
                    <button class={`${styles.tab} ${styles.active}`}>Videos</button>
                    <button class={styles.tab}>Liked</button>
                </div>

                <div class={styles.videosGrid}>
                    <div class={styles.emptyState}>
                        <span class={styles.emptyIcon}>📹</span>
                        <p class={styles.emptyText}>No videos yet</p>
                        <p class={styles.emptySubtext}>Your videos will appear here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
