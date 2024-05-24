--liquibase formatted sql

--changeset i.shcherbachenya:2024-05-24--add-user-spam-indicator
--comment Add users spam indicator, which indicates that user sends a lot of spam content in reviews (for example - urls).
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.tables WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='user_spam_indicator';
CREATE TABLE user_spam_indicator
(
    id            VARCHAR(36)                        NOT NULL UNIQUE,
    user_id       VARCHAR(255) REFERENCES users (id) NOT NULL UNIQUE,
    spam_counter  INTEGER                            NOT NULL,
    creation_date TIMESTAMP                          NOT NULL,
    update_date   TIMESTAMP,
    PRIMARY KEY (id)
);