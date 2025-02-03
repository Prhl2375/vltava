import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/main.scss',
                'resources/sass/components/banner.scss',
                'resources/sass/components/separator.scss',
                'resources/sass/components/grid.scss',
                'resources/sass/components/product-card.scss',
                'resources/sass/pages/home.scss',


                'resources/js/components/banner.js',
            ],
            refresh: true,
        }),
    ],
});
