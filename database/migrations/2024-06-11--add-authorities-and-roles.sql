--liquibase formatted sql

--changeset i.shcherbachenya:2024-06-11--add-authorities-and-roles-00
--comment Add roles ADMIN, USER, USER_BLOCKED
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM role WHERE name IN ('USER', 'USER_BLOCKED', 'ADMIN');
INSERT INTO role (id, name)
VALUES
    ('9399186f-b4d6-48da-9862-24582a4f3bc1', 'USER'),
    ('3d304773-e90f-44ff-85ff-ab749eb26e69', 'USER_BLOCKED'),
    ('d3b3461b-6903-4174-abea-903856e913b3', 'ADMIN');


--changeset i.shcherbachenya:2024-06-11--add-authorities-and-roles-01
--comment Add authorities REVIEW_ADD, REVIEW_CHANGE, REVIEW_REMOVE, LIKES, PROFILE_CHANGE
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM role WHERE name IN ('REVIEW_ADD', 'REVIEW_CHANGE', 'REVIEW_REMOVE', 'LIKES', 'PROFILE_CHANGE');
INSERT INTO authority (id, name)
VALUES
    ('4407e3f3-8dde-472b-bbe4-d7a6deea5fe2', 'REVIEW_ADD'),
    ('0e0c8975-0370-4404-8279-63f0208d8c64', 'SELF_REVIEW_CHANGE'),
    ('b2f965d3-7ec6-475d-9f78-c7fef0b5ea5b', 'SELF_REVIEW_REMOVE'),
    ('b0e8c664-2ede-475c-8ee2-6b1f07965140', 'SELF_LIKES'),
    ('0528ec87-56a7-4e57-b2dc-62c97117e826', 'SELF_PROFILE_READ'),
    ('e4e41563-6100-45fb-b65e-8be37eb705a7', 'SELF_PROFILE_CHANGE'),
    ('36fbd586-8ef4-46c7-bbe0-a57fd9da8bd5', 'SELF_PROFILE_REMOVE');


--changeset i.shcherbachenya:2024-06-11--add-authorities-and-roles-02
--comment Connect authorities with roles
--preconditions onFail:HALT onError:HALT
INSERT INTO role_authority (role_id, authority_id)
VALUES
    ('9399186f-b4d6-48da-9862-24582a4f3bc1', '4407e3f3-8dde-472b-bbe4-d7a6deea5fe2'),
    ('9399186f-b4d6-48da-9862-24582a4f3bc1', '0e0c8975-0370-4404-8279-63f0208d8c64'),
    ('9399186f-b4d6-48da-9862-24582a4f3bc1', 'b2f965d3-7ec6-475d-9f78-c7fef0b5ea5b'),
    ('9399186f-b4d6-48da-9862-24582a4f3bc1', 'b0e8c664-2ede-475c-8ee2-6b1f07965140'),
    ('9399186f-b4d6-48da-9862-24582a4f3bc1', '0528ec87-56a7-4e57-b2dc-62c97117e826'),
    ('9399186f-b4d6-48da-9862-24582a4f3bc1', 'e4e41563-6100-45fb-b65e-8be37eb705a7'),
    ('9399186f-b4d6-48da-9862-24582a4f3bc1', '36fbd586-8ef4-46c7-bbe0-a57fd9da8bd5'),

    ('3d304773-e90f-44ff-85ff-ab749eb26e69', '0528ec87-56a7-4e57-b2dc-62c97117e826'),
    ('3d304773-e90f-44ff-85ff-ab749eb26e69', '36fbd586-8ef4-46c7-bbe0-a57fd9da8bd5');
