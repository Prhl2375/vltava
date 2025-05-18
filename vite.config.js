import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/main.scss',
                'resources/sass/components/vltava-banner.scss',
                'resources/sass/components/vltava-separator.scss',
                'resources/sass/components/vltava-grid.scss',
                'resources/sass/components/vltava-product-card.scss',
                'resources/sass/components/vltava-button.scss',
                'resources/sass/components/vltava-service.scss',
                'resources/sass/pages/home.scss',
                'resources/sass/pages/menu.scss',
                'resources/sass/menu-layout.scss',
                'resources/sass/components/vltava-menu-nav.scss',


                'resources/js/components/vltava-banner.js',
            ],
            refresh: true,
        }),
    ],
});
