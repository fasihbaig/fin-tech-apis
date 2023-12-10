# Use the official MySQL image from Docker Hub
FROM mysql:latest

# Set the MySQL root password (change it to a secure password)
ENV MYSQL_ROOT_PASSWORD=12345678

# Create a database and user
ENV MYSQL_DATABASE=FintechDB
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=12345678

# Copy the SQL script to initialize the database (if needed)
# COPY ./init.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306