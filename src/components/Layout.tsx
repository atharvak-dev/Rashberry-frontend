import { Component, JSX } from 'solid-js';
import Navigation from './Navigation';
import styles from './Layout.module.css';

interface LayoutProps {
    children?: JSX.Element;
}

const Layout: Component<LayoutProps> = (props) => {
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
