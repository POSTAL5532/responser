CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
    id             VARCHAR(36)  NOT NULL UNIQUE,
    user_name      VARCHAR(255) NOT NULL UNIQUE,
    email          VARCHAR(255) NOT NULL UNIQUE,
    password       VARCHAR(255) NOT NULL,
    first_name     VARCHAR(255) NOT NULL,
    last_name      VARCHAR(255) NOT NULL,
    creation_date  TIMESTAMP    NOT NULL,
    update_date    TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE domains
(
    id            VARCHAR(36) NOT NULL UNIQUE,
    domain        TEXT        NOT NULL,
    name          TEXT        NOT NULL,
    description   TEXT,
    has_ssl       boolean     NOT NULL,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE resources
(
    id            VARCHAR(36) NOT NULL UNIQUE,
    domain_id     VARCHAR(36) NOT NULL REFERENCES domains (id) ON DELETE CASCADE,
    url           TEXT        NOT NULL UNIQUE,
    name          TEXT        NOT NULL,
    description   TEXT,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE responses
(
    id            VARCHAR(36) NOT NULL UNIQUE,
    user_id       VARCHAR(36) NOT NULL /*REFERENCES users (id) ON DELETE CASCADE*/,
    resource_id   VARCHAR(36) NOT NULL REFERENCES resources (id) ON DELETE CASCADE,
    response_id   VARCHAR(36) REFERENCES responses (id) ON DELETE CASCADE,
    rating        SMALLINT    NOT NULL,
    text          TEXT,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE responses_likes
(
    id            VARCHAR(36) NOT NULL UNIQUE,
    user_id       VARCHAR(36) NOT NULL NOT NULL /*REFERENCES users (id) ON DELETE CASCADE*/,
    response_id   VARCHAR(36) NOT NULL REFERENCES responses (id) ON DELETE CASCADE,
    positive      BOOLEAN     NOT NULL,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);