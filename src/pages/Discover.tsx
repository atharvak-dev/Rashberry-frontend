import { Component, createSignal } from 'solid-js';
import styles from './Discover.module.css';

const Discover: Component = () => {
    const [searchQuery, setSearchQuery] = createSignal('');

    return (
        <div class={styles.container}>
            <header class={styles.header}>
                <h1 class={styles.title}>Discover</h1>
                <div class={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search videos, creators..."
                        value={searchQuery()}
                        onInput={(e) => setSearchQuery(e.currentTarget.value)}
                        class={styles.searchInput}
                    />
                </div>
            </header>

            <section class={styles.content}>
                <div class={styles.placeholder}>
                    <span class={styles.placeholderIcon}>🔍</span>
                    <p class={styles.placeholderText}>Search for amazing content</p>
                </div>
            </section>
        </div>
    );
};

export default Discover;
