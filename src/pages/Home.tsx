import { Component, For, createSignal } from 'solid-js';
import VideoFeed from '../components/VideoFeed/VideoFeed';
import styles from './Home.module.css';

const Home: Component = () => {
    return (
        <div class={styles.container}>
            <VideoFeed />
        </div>
    );
};

export default Home;
