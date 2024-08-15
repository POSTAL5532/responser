--liquibase formatted sql

--changeset i.shcherbachenya:2024-08-15--added-new-default-users-avatars-00
--comment Add new default users avatars.
--preconditions onFail:HALT onError:HALT
UPDATE users SET avatar_file_name = 'default-user-avatar-' || (FLOOR(RANDOM() * 8) + 1) || '.svg' WHERE avatar_file_name IS NULL;