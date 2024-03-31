CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
    id               VARCHAR(36)  NOT NULL UNIQUE,
    email            VARCHAR(255) NOT NULL UNIQUE,
    password         VARCHAR(255) NOT NULL,
    full_name        VARCHAR(255) NOT NULL,
    avatar_file_name VARCHAR(255),
    email_confirmed  boolean      NOT NULL,
    creation_date    TIMESTAMP    NOT NULL,
    update_date      TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE email_confirmations
(
    id            VARCHAR(36) NOT NULL UNIQUE,
    user_id       VARCHAR(36) NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE password_restores
(
    id            VARCHAR(36) NOT NULL UNIQUE,
    user_id       VARCHAR(36) NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE web_resource
(
    id             VARCHAR(36) NOT NULL UNIQUE,
    parent_id      VARCHAR(36) REFERENCES web_resource (id) ON DELETE CASCADE,
    url            TEXT        NOT NULL,
    icon_file_name VARCHAR(255),
    resource_type  VARCHAR(36) NOT NULL,
    creation_date  TIMESTAMP   NOT NULL,
    update_date    TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE reviews
(
    id            VARCHAR(36) NOT NULL UNIQUE,
    user_id       VARCHAR(36) NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    resource_id   VARCHAR(36) NOT NULL REFERENCES web_resource (id) ON DELETE CASCADE,
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

CREATE TABLE review_meta_image
(
    id            VARCHAR(36) NOT NULL UNIQUE,
    review_id     VARCHAR(36) NOT NULL UNIQUE REFERENCES reviews (id) ON DELETE CASCADE,
    image         BYTEA       NOT NULL,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);