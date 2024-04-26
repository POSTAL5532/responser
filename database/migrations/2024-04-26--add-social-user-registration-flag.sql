--liquibase formatted sql

--changeset i.shcherbachenya:2024-04-26--add-social-user-registration-flag
--comment Add users 'registered by' flag for indicate, that user was registered as one of social methods (eg. Google, GitHub, etc.) or native by email.
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.columns  WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='users' AND column_name='registered_by';
ALTER TABLE users ADD registered_by VARCHAR(255);