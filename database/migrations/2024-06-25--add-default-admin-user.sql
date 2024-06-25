--liquibase formatted sql

--changeset i.shcherbachenya:2024-06-25--add-default-admin-user-00
--comment Add default admin user.
--preconditions onFail:HALT onError:HALT
--precondition-sql-check expectedResult:0 SELECT count(*) FROM users WHERE id = '00000000-0000-0000-user-admin0000000';
INSERT INTO users (id, email, password, full_name, avatar_file_name, email_confirmed, creation_date, registered_by)
VALUES ('00000000-0000-0000-user-admin0000000',
        'admin@admin.com',
        '$2a$10$byRTFL.VFzvyWqczc8zCaOgOPFoNQcrZV9drK4si9n.jRxzSXJOpe',
        'Admin Man',
        NULL,
        true,
        '2023-11-04 12:34:56',
        'NATIVE');

INSERT INTO user_role (user_id, role_id)
VALUES ('00000000-0000-0000-user-admin0000000', 'd3b3461b-6903-4174-abea-903856e913b3')