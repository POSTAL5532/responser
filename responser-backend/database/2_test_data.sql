INSERT INTO users (id, user_name, email, password, first_name, last_name, creation_date, update_date)
VALUES ('0d7bc62f-7381-4a7a-969c-12c510ac887e', 'testUser', 'testUser@email.em', 'qwerty123', 'Test', 'User',
        '2021-10-23 22:13:37.997198+00', '2021-10-23 22:13:37.997198+00');

INSERT INTO domains (id, domain, has_ssl, name, description, creation_date, update_date)
VALUES ('10b7a065-67e6-4a4d-9e43-23fe464fc017', 'gidonline.io', true, 'gidonline', 'Some description',
        '2022-10-25 22:13:37.997198+00', NULL);

INSERT INTO resources (id, domain_id, url, name, description, creation_date, update_date)
VALUES ('10123065-67e6-4a4d-9e43-23fe464fc017',
        '10b7a065-67e6-4a4d-9e43-23fe464fc017',
        'https://gidonline.io/film/robot-po-imeni-chappi',
        'Робот по имени Чаппи - смотреть онлайн бесплатно в хорошем качестве',
        'Робот по имени Чаппи - смотреть онлайн бесплатно в хорошем качестве',
        '2022-10-25 22:13:37.997198+00',
        NULL),
       ('10321065-67e6-4a4d-9e43-23fe464fc018',
        '10b7a065-67e6-4a4d-9e43-23fe464fc017',
        'https://gidonline.io/film/zapadnya-1999',
        'Западня - смотреть онлайн бесплатно в хорошем качестве',
        'Западня - смотреть онлайн бесплатно в хорошем качестве',
        '2022-10-25 23:15:37.997198+00',
        NULL);

INSERT INTO responses (id, user_id, resource_id, response_id, rating, text, creation_date, update_date)
VALUES ('10123123-67e6-4a4d-9e43-23fe464fc017',
        '0d7bc62f-7381-4a7a-969c-12c510ac887e',
        '10123065-67e6-4a4d-9e43-23fe464fc017',
        NULL, 3, 'Woooooow!', '2022-10-25 23:15:37.997198+00', NULL),
       ('10123123-67e6-4a4d-9e43-23fe464fc018',
        '0d7bc62f-7381-4a7a-969c-12c510ac887e',
        '10123065-67e6-4a4d-9e43-23fe464fc017',
        NULL, 4, 'Woooooo000000000000000000w!', '2022-10-25 23:15:37.997198+00', NULL);
