import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/main.scss',
                'resources/sass/components/banner.scss',
                'resources/js/components/banner.js',
            ],
            refresh: true,
        }),
    ],
});
