import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.rashberry.app',
    appName: 'Rashberry',
    webDir: 'dist',
    server: {
        // Enable live reload during development
        // Comment this out for production builds
        // url: 'http://YOUR_LOCAL_IP:3000',
        // cleartext: true,
    },
    plugins: {
        // Capacitor plugins configuration
    },
    android: {
        allowMixedContent: true,
    },
    ios: {
        contentInset: 'automatic',
    },
};

export default config;
