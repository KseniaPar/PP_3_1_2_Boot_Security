
INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`, `age`)
VALUES
(1,'admin@mail.ru','$2a$12$Cc9L.iqjC3mVLYrfArAuCe2seN2ul2iYG5qhUDpNmd7K7DlawiUbu', 'Маруся', 'Иванова', 33),
(2,'user@mail.ru','$2a$12$Cc9L.iqjC3mVLYrfArAuCe2seN2ul2iYG5qhUDpNmd7K7DlawiUbu', 'Иван', 'Иванов', 33);

INSERT INTO `roles` (`id`, `name`)
VALUES
(1,'ROLE_ADMIN'),
(2,'ROLE_USER');

insert into users_roles
values
(1, 1),
(1, 2),
(2, 2);