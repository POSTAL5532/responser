--liquibase formatted sql

--changeset i.shcherbachenya:2024-06-23--add-contact-forms-admin-authorities-00
--comment Add authorities REVIEW_ADD, REVIEW_CHANGE, REVIEW_REMOVE, LIKES, PROFILE_CHANGE
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM authority WHERE name IN ('CHANGE_CONTACT_FORMS');
INSERT INTO authority (id, name)
VALUES
    ('82330a3a-ad68-443a-8a91-da794bd42bb3', 'CHANGE_CONTACT_FORMS');


--changeset i.shcherbachenya:2024-06-23--add-contact-forms-admin-authorities-01
--comment Connect authorities with roles
--preconditions onFail:HALT onError:HALT
INSERT INTO role_authority (role_id, authority_id)
VALUES
    ('d3b3461b-6903-4174-abea-903856e913b3', '82330a3a-ad68-443a-8a91-da794bd42bb3');
