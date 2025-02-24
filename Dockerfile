FROM php:8.2-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    sudo \
    git \
    unzip \
    libpq-dev \
    procps \
    vim \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    libicu-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_pgsql gd zip intl

#RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash \
#    && . ~/.nvm/nvm.sh \
#    && nvm install 22 \
#    && nvm alias default 22 \
#    && nvm use default

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

COPY php.ini /usr/local/etc/php/php.ini

COPY --chown=www-data:www-data . /var/www

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

CMD ["php-fpm"]
