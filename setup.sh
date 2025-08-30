
#!/bin/bash

# Create unique database name using request_id
DATABASE_NAME="a58cad67_f13a_415f_9eb9_069550f67951"

# Define project directory
PROJECT_DIR="/home/coder/project/workspace/question_generation_service/solutions/a58cad67-f13a-415f-9eb9-069550f67951/springapp"

# Spring CLI command to generate project
spring init \
  --type=maven-project \
  --language=java \
  --boot-version=3.4.0 \
  --packaging=jar \
  --java-version=17 \
  --groupId=com.examly \
  --artifactId=springapp \
  --name="Real Estate Listing Management System" \
  --description="Spring Boot backend for Real Estate Listing Management System" \
  --package-name=com.examly.springapp \
  --dependencies=web,data-jpa,validation,mysql \
  --build=maven \
  ${PROJECT_DIR}

# Wait for project generation to complete
sleep 2

# Create MySQL database
mysql -u root -pexamly -e "CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME};" 2>/dev/null || echo "Database creation failed, will use default"

# Configure application.properties
cat > "${PROJECT_DIR}/src/main/resources/application.properties" << EOL
spring.datasource.url=jdbc:mysql://localhost:3306/${DATABASE_NAME}?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=examly
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Server configuration
server.port=8080
server.error.include-message=always

# Logging configuration
logging.level.org.springframework=INFO
logging.level.com.examly=DEBUG
EOL
