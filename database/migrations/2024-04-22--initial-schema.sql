--liquibase formatted sql

--changeset i.shcherbachenya:2024-04-22--initial-schema-00
--comment Create users table
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.tables WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='users';
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

--changeset i.shcherbachenya:2024-04-22--initial-schema-01
--comment Create initial role table
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.tables WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='role';
CREATE TABLE role
(
    id   VARCHAR(36) NOT NULL,
    name VARCHAR(64) NOT NULL,
    PRIMARY KEY (id)
);

--changeset i.shcherbachenya:2024-04-22--initial-schema-02
--comment Create user_role table
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.tables WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='user_role';
CREATE TABLE user_role
(
    user_id VARCHAR(36) REFERENCES users (id) NOT NULL,
    role_id VARCHAR(36) REFERENCES role (id)  NOT NULL
);

--changeset i.shcherbachenya:2024-04-22--initial-schema-03
--comment Create authority table
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.tables WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='authority';
CREATE TABLE authority
(
    id   VARCHAR(36) NOT NULL,
    name VARCHAR(32) NOT NULL,
    PRIMARY KEY (id)
);

--changeset i.shcherbachenya:2024-04-22--initial-schema-04
--comment Create role_authority table
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.tables WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='role_authority';
CREATE TABLE role_authority
(
    role_id      VARCHAR(36) REFERENCES role (id)      NOT NULL,
    authority_id VARCHAR(36) REFERENCES authority (id) NOT NULL
);

--changeset i.shcherbachenya:2024-04-22--initial-schema-05
--comment Create email_confirmations table
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.tables WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='email_confirmations';
CREATE TABLE email_confirmations
(
    id            VARCHAR(36) NOT NULL UNIQUE,
    user_id       VARCHAR(36) NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);

--changeset i.shcherbachenya:2024-04-22--initial-schema-06
--comment Create password_restores table
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.tables WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='password_restores';
CREATE TABLE password_restores
(
    id            VARCHAR(36) NOT NULL UNIQUE,
    user_id       VARCHAR(36) NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    creation_date TIMESTAMP   NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);

--changeset i.shcherbachenya:2024-04-22--initial-schema-07
--comment Create web_resource table
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.tables WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='web_resource';
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

--changeset i.shcherbachenya:2024-04-22--initial-schema-08
--comment Create reviews table
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.tables WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='reviews';
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

--changeset i.shcherbachenya:2024-04-22--initial-schema-09
--comment Create reviews_likes table
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.tables WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='reviews_likes';
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

--changeset i.shcherbachenya:2024-04-22--initial-schema-10
--comment Create contact_form table
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.tables WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='contact_form';
CREATE TABLE contact_form
(
    id            VARCHAR(36)  NOT NULL UNIQUE,
    username      VARCHAR(255) NOT NULL,
    email         VARCHAR(255) NOT NULL,
    text          TEXT NOT NULL,
    creation_date TIMESTAMP    NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);