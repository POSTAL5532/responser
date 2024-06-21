--liquibase formatted sql

--changeset i.shcherbachenya:2024-06-21--add-user-contact-form-read-flag-00
--comment Add 'read' flag for user contact form entity.
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.columns  WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='contact_form' AND column_name='read';
ALTER TABLE contact_form ADD read boolean NOT NULL DEFAULT false;
