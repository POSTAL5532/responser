FROM openjdk:17
ENV SPRING_CONFIG_LOCATION=/application/application.yml
CMD ["java","-Xmx220M","-XshowSettings:vm","-jar","/application/reviewly-auth-server.jar"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]
EXPOSE 8081
