## Run database
`docker-compose up responser_db`

## Run auth-server

## Run backend application

## Run frontend application
* Setup `env/<mode>.env` file from `env/.env.template`
* `npm run start` - run FE app for local development\
  `npm run build:<mode>` - build FE app

### Modes
* `local` - local development
* `dev` - dev stage
* `prod` - production

## Run landing
* Setup `env/<mode>.env` file from `env/.env.template`
* `node builder.js` - build landing (`prod` argument for production)
* `npx serve -l <PORT> build` - run local host with landing

### Modes
* `dev` - dev stage
* `prod` - production

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