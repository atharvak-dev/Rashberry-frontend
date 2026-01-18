import { Component, For, createSignal, onMount, onCleanup } from 'solid-js';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import styles from './VideoFeed.module.css';

// Mock video data - will be replaced with API calls
const mockVideos = [
    {
        id: '1',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        username: '@creator1',
        description: 'Check out this awesome content! 🔥 #trending #viral',
        likes: 12400,
        comments: 342,
        shares: 89,
    },
    {
        id: '2',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        username: '@creator2',
        description: 'Another amazing video for you ✨',
        likes: 8500,
        comments: 156,
        shares: 42,
    },
    {
        id: '3',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        username: '@creator3',
        description: 'Having fun with this one! 🎉 #fun #creative',
        likes: 23100,
        comments: 892,
        shares: 234,
    },
];

const VideoFeed: Component = () => {
    const [currentIndex, setCurrentIndex] = createSignal(0);
    let containerRef: HTMLDivElement | undefined;

    const handleScroll = () => {
        if (!containerRef) return;

        const scrollTop = containerRef.scrollTop;
        const itemHeight = containerRef.clientHeight;
        const newIndex = Math.round(scrollTop / itemHeight);

        if (newIndex !== currentIndex()) {
            setCurrentIndex(newIndex);
        }
    };

    return (
        <div
            ref={containerRef}
            class={styles.container}
            onScroll={handleScroll}
        >
            <For each={mockVideos}>
                {(video, index) => (
                    <div class={styles.videoWrapper}>
                        <VideoPlayer
                            video={video}
                            isActive={index() === currentIndex()}
                        />
                    </div>
                )}
            </For>
        </div>
    );
};

export default VideoFeed;
