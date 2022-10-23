CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE domains
(
    id            VARCHAR(36) NOT NULL,
    domain        TEXT        NOT NULL,
    name          TEXT        NOT NULL,
    description   TEXT,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE resources
(
    id            VARCHAR(36) NOT NULL,
    domain_id     VARCHAR(36) NOT NULL REFERENCES domains (id) ON DELETE CASCADE,
    url           TEXT        NOT NULL,
    name          TEXT        NOT NULL,
    description   TEXT,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE responses
(
    id            VARCHAR(36) NOT NULL,
    user_id       VARCHAR(36) NOT NULL,
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
    id            VARCHAR(36) NOT NULL,
    user_id       VARCHAR(36) NOT NULL,
    response_id   VARCHAR(36),
    positive      BOOLEAN     NOT NULL,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (response_id) REFERENCES responses (id)
);