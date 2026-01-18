import { Component, createSignal, createEffect, onCleanup } from 'solid-js';
import styles from './VideoPlayer.module.css';

interface Video {
    id: string;
    videoUrl: string;
    username: string;
    description: string;
    likes: number;
    comments: number;
    shares: number;
}

interface VideoPlayerProps {
    video: Video;
    isActive: boolean;
}

const formatCount = (count: number): string => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
};

const VideoPlayer: Component<VideoPlayerProps> = (props) => {
    const [isPlaying, setIsPlaying] = createSignal(false);
    const [isLiked, setIsLiked] = createSignal(false);
    let videoRef: HTMLVideoElement | undefined;

    // Auto-play when active
    createEffect(() => {
        if (!videoRef) return;

        if (props.isActive) {
            videoRef.play().catch(() => {
                // Autoplay failed (user interaction required)
            });
            setIsPlaying(true);
        } else {
            videoRef.pause();
            videoRef.currentTime = 0;
            setIsPlaying(false);
        }
    });

    const togglePlay = () => {
        if (!videoRef) return;

        if (videoRef.paused) {
            videoRef.play();
            setIsPlaying(true);
        } else {
            videoRef.pause();
            setIsPlaying(false);
        }
    };

    const handleLike = () => {
        setIsLiked(!isLiked());
    };

    return (
        <div class={styles.container}>
            {/* Video */}
            <video
                ref={videoRef}
                class={styles.video}
                src={props.video.videoUrl}
                loop
                muted
                playsinline
                onClick={togglePlay}
            />

            {/* Play/Pause overlay */}
            <div
                class={styles.playOverlay}
                classList={{ [styles.hidden]: isPlaying() }}
                onClick={togglePlay}
            >
                <span class={styles.playIcon}>▶</span>
            </div>

            {/* Video info overlay */}
            <div class={styles.overlay}>
                {/* Left side: Video info */}
                <div class={styles.info}>
                    <p class={styles.username}>{props.video.username}</p>
                    <p class={styles.description}>{props.video.description}</p>
                </div>

                {/* Right side: Action buttons */}
                <div class={styles.actions}>
                    <button
                        class={styles.actionButton}
                        classList={{ [styles.liked]: isLiked() }}
                        onClick={handleLike}
                    >
                        <span class={styles.actionIcon}>{isLiked() ? '❤️' : '🤍'}</span>
                        <span class={styles.actionCount}>
                            {formatCount(props.video.likes + (isLiked() ? 1 : 0))}
                        </span>
                    </button>

                    <button class={styles.actionButton}>
                        <span class={styles.actionIcon}>💬</span>
                        <span class={styles.actionCount}>{formatCount(props.video.comments)}</span>
                    </button>

                    <button class={styles.actionButton}>
                        <span class={styles.actionIcon}>↗️</span>
                        <span class={styles.actionCount}>{formatCount(props.video.shares)}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
