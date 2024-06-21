--liquibase formatted sql

--changeset i.shcherbachenya:2024-06-20--add-admin-authorities-00
--comment Add authorities REVIEW_ADD, REVIEW_CHANGE, REVIEW_REMOVE, LIKES, PROFILE_CHANGE
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM role WHERE name IN ('SELECT_ANY_USER', 'CHANGE_ANY_USER', 'DELETE_ANY_USER', 'SELECT_ANY_REVIEW', 'CHANGE_ANY_REVIEW', 'DELETE_ANY_REVIEW');
INSERT INTO authority (id, name)
VALUES
    ('0d25f4ae-fc07-4523-9bab-ff61a290f5c5', 'SELECT_ANY_USER'),
    ('21bb82ee-5408-4d81-9a4b-7d90393c6a65', 'CHANGE_ANY_USER'),
    ('1fa7262b-7e43-4d72-81ae-78416c72f739', 'DELETE_ANY_USER'),
    ('4696036a-af1a-4f9d-a183-3d62ec1a428d', 'SELECT_ANY_REVIEW'),
    ('db03452c-48fe-4ab3-80bc-788e304abf7a', 'CHANGE_ANY_REVIEW'),
    ('6df13fb4-a9ae-4ce6-ac60-f9ef5f5e051d', 'DELETE_ANY_REVIEW'),
    ('b046ba3c-c5f7-416b-afaf-2fc02aa6331c', 'SEE_CONTACT_FORMS');


--changeset i.shcherbachenya:2024-06-20--add-admin-authorities-01
--comment Connect authorities with roles
--preconditions onFail:HALT onError:HALT
INSERT INTO role_authority (role_id, authority_id)
VALUES
    ('d3b3461b-6903-4174-abea-903856e913b3', '0d25f4ae-fc07-4523-9bab-ff61a290f5c5'),
    ('d3b3461b-6903-4174-abea-903856e913b3', '21bb82ee-5408-4d81-9a4b-7d90393c6a65'),
    ('d3b3461b-6903-4174-abea-903856e913b3', '1fa7262b-7e43-4d72-81ae-78416c72f739'),
    ('d3b3461b-6903-4174-abea-903856e913b3', '4696036a-af1a-4f9d-a183-3d62ec1a428d'),
    ('d3b3461b-6903-4174-abea-903856e913b3', 'db03452c-48fe-4ab3-80bc-788e304abf7a'),
    ('d3b3461b-6903-4174-abea-903856e913b3', '6df13fb4-a9ae-4ce6-ac60-f9ef5f5e051d'),
    ('d3b3461b-6903-4174-abea-903856e913b3', 'b046ba3c-c5f7-416b-afaf-2fc02aa6331c');
