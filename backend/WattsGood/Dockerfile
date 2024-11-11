FROM maven:3.8.5-eclipse-temurin-17

WORKDIR /wattsgood
COPY . .
RUN mvn clean install

CMD mvn spring-boot:run