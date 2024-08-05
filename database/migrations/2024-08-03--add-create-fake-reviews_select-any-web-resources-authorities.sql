--liquibase formatted sql

--changeset i.shcherbachenya:2024-08-03--add-create-fake-reviews_select-any-web-resources-authorities-00
--comment Add SELECT_ANY_WEB_RESOURCES, CREATE_FAKE_REVIEWS and CREATE_FAKE_USERS authority
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM authority WHERE name IN ('SELECT_ANY_WEB_RESOURCES', 'CREATE_FAKE_REVIEWS', 'CREATE_FAKE_USERS');
INSERT INTO authority (id, name)
VALUES
    ('2595b59f-d5b6-445d-91ff-3a6aee0cfe40', 'SELECT_ANY_WEB_RESOURCES'),
    ('30d937a3-7fa4-47a6-9bee-f7689e269d81', 'CREATE_FAKE_REVIEWS'),
    ('cbb62f79-fad0-4c00-88c7-b6dda8bfdc09', 'CREATE_FAKE_USERS');


--changeset i.shcherbachenya:2024-08-03--add-create-fake-reviews_select-any-web-resources-authorities-01
--comment Connect SELECT_ANY_WEB_RESOURCES, CREATE_FAKE_REVIEWS and CREATE_FAKE_USERS authorities with ADMIN role
--preconditions onFail:HALT onError:HALT
INSERT INTO role_authority (role_id, authority_id)
VALUES
    ('d3b3461b-6903-4174-abea-903856e913b3', '82330a3a-ad68-443a-8a91-da794bd42bb3'),
    ('d3b3461b-6903-4174-abea-903856e913b3', '30d937a3-7fa4-47a6-9bee-f7689e269d81'),
    ('d3b3461b-6903-4174-abea-903856e913b3', 'cbb62f79-fad0-4c00-88c7-b6dda8bfdc09');
