## Build project
`./gradlew build -DbuildMode=<MODE>` (see build modes on bottom)

## Run database
`docker-compose up responser_db`

## Run auth-server
* Add to IDEA program arguments `--spring.config.location=file:configs/responser-auth-server/local/application.yml`
* Run application

## Run backend application
* Add to IDEA program arguments `--spring.config.location=file:configs/responser-backend/local/application.yml`
* Run application

## Run frontend application
* Setup `env/<mode>.env` file from `env/.env.template`
* `npm run start` - run FE app for local development\
  `npm run build:<mode>` - build FE app

## Run file store dev stub application
* Setup `<responser-file-store_module>/src/main/resources/responser-file-store-stub.properties` file 
from `<responser-file-store_module>/src/main/resources/responser-file-store-stub.properties.template`
* `./gradlew :responser-file-store:run` - run stub

## Build extension
* `npm run build:<mode>`
* `nodemon --exec npm run build:local --ext "*"` - build extension with changes watching for 
development

### Modes
* `local` - local development
* `dev` - dev stage
* `prod` - production

## Test users:
login: `testUser`\
email: `testUser@test.test`\
password: `qwerty`

login: `testUser<N>`\
email: `testUser<N>@test.test`\
password: `qwerty`

where `<N>` from `1` to `9`