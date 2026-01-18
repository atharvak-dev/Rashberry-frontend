import { Component, For, createSignal } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import styles from './Navigation.module.css';

interface NavItem {
    path: string;
    label: string;
    icon: string;
    iconActive: string;
}

const navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: '🏠', iconActive: '🏡' },
    { path: '/discover', label: 'Discover', icon: '🔍', iconActive: '🔎' },
    { path: '/upload', label: 'Upload', icon: '➕', iconActive: '✚' },
    { path: '/profile', label: 'Profile', icon: '👤', iconActive: '👨' },
];

const Navigation: Component = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <nav class={styles.nav}>
            <div class={styles.container}>
                <For each={navItems}>
                    {(item) => (
                        <A
                            href={item.path}
                            class={styles.navItem}
                            classList={{ [styles.active]: isActive(item.path) }}
                        >
                            <span class={styles.icon}>
                                {isActive(item.path) ? item.iconActive : item.icon}
                            </span>
                            <span class={styles.label}>{item.label}</span>
                        </A>
                    )}
                </For>
            </div>
        </nav>
    );
};

export default Navigation;
