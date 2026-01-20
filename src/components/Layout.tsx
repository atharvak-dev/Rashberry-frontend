import { Component, JSX } from 'solid-js';
import { RouteSectionProps } from '@solidjs/router';
import Navigation from './Navigation';
import styles from './Layout.module.css';

const Layout: Component<RouteSectionProps> = (props) => {
    return (
        <div class={styles.layout}>
            <main class={styles.main}>
                {props.children}
            </main>
            <Navigation />
        </div>
    );
};

export default Layout;
