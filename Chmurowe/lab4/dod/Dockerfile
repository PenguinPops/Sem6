# Latest ubuntu image
FROM ubuntu:latest

#Author
LABEL maintainer="kowalski @chmurowe.pl"

# Update system
RUN apt-get update

# Install apache latest
RUN apt-get install -y apache2

# Copy a webpage onto the server
COPY index.html /var/www/html/index.html

# Expose port 80
EXPOSE 80

# Start apache in foreground
CMD ["apachectl", "-D", "FOREGROUND"]

