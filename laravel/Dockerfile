FROM dunglas/frankenphp:latest-php8.3-alpine

RUN apk add --no-cache bash git zip unzip \
    && install-php-extensions \
    pcntl \
    pdo_pgsql \
    redis \
    opcache \
    zip \
    intl \
    gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./
COPY Caddyfile /etc/caddy/Caddyfile
COPY php.ini /usr/local/etc/php/conf.d/custom.ini
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

COPY . .

RUN composer dump-autoload --optimize \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

CMD ["sh", "-c", "php artisan migrate --force --seed && frankenphp run --config /etc/caddy/Caddyfile"]
