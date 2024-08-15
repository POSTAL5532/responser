--liquibase formatted sql

--changeset i.shcherbachenya:2024-08-11--add-review-source-00
--comment Add 'source' of review. For example "TRUSTPILOT" or "REVIEWLY".
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM information_schema.columns  WHERE table_catalog = 'reviewly' AND table_schema = 'public' AND table_name='reviews' AND column_name='source';
ALTER TABLE reviews ADD source VARCHAR(255) NOT NULL DEFAULT 'REVIEWLY';