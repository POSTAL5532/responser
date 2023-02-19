CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
    id            VARCHAR(36)  NOT NULL UNIQUE,
    user_name     VARCHAR(255) NOT NULL UNIQUE,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password      VARCHAR(255) NOT NULL,
    full_name     VARCHAR(255) NOT NULL,
    creation_date TIMESTAMP    NOT NULL,
    update_date   TIMESTAMP,
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

CREATE TABLE pages
(
    id            VARCHAR(36) NOT NULL UNIQUE,
    domain_id     VARCHAR(36) NOT NULL REFERENCES domains (id) ON DELETE CASCADE,
    url           TEXT        NOT NULL UNIQUE,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE reviews
(
    id            VARCHAR(36) NOT NULL UNIQUE,
    user_id       VARCHAR(36) NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    resource_type VARCHAR(36) NOT NULL,
    resource_id   VARCHAR(36) NOT NULL,
    review_id     VARCHAR(36) REFERENCES reviews (id) ON DELETE CASCADE,
    rating        SMALLINT    NOT NULL,
    text          TEXT,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE reviews_likes
(
    id            VARCHAR(36) NOT NULL UNIQUE,
    user_id       VARCHAR(36) NOT NULL NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    review_id     VARCHAR(36) NOT NULL REFERENCES reviews (id) ON DELETE CASCADE,
    positive      BOOLEAN     NOT NULL,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);