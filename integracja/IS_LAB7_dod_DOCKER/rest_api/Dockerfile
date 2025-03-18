# Obraz bazowy
FROM php:7.2-apache

# Inne składniki wymagane do działania aplikacji
RUN apt-get update && apt-get install -y apache2 && docker-php-ext-install mysqli

# Skopiuj pliki aplikacji do kontenera
COPY . /var/www/html/

# Włącz moduł rewrite dla Apache
RUN a2enmod rewrite

# Ustaw uprawnienia dla katalogu aplikacji
RUN chown -R www-data:www-data /var/www/html

# Ustawienie portu
EXPOSE 80