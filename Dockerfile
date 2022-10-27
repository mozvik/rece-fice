FROM php:7.4-apache
WORKDIR /var/www/html
COPY ./dist/rece-fice /var/www/html
COPY ./src/api /var/www/html/api
RUN docker-php-ext-install mysqli pdo pdo_mysql


