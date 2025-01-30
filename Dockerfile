FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www

# Install system dependencies and PHP extensions required for Laravel and PostgreSQL
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
    && docker-php-ext-install pdo pdo_pgsql gd zip intl # Added intl here

# Install Composer globally
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy the application code
COPY . .

# Copy the custom PHP configuration
COPY php.ini /usr/local/etc/php/php.ini

# Copy existing application directory permissions
COPY --chown=www-data:www-data . /var/www

# Change ownership of the storage and cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Change permissions of the storage and cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Define the main command to run PHP-FPM
CMD ["php-fpm"]
