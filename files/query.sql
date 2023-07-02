-- ----------------------------------------------------------------------
-- Consultas utilizadas para o sistema de registro

SELECT * FROM user WHERE username = ?;
INSERT INTO user ( name, username, password, phone, email ) VALUES ( ?, ?, ?, ?, ? );

-- ----------------------------------------------------------------------
-- Consultas utilizadas para o sistema de login/logout

SELECT username FROM user WHERE username = ?;
SELECT password FROM user WHERE username = ?;

-- ----------------------------------------------------------------------
-- Consultas utilizadas para o sistema de convite de listas de tarefas

SELECT user_id FROM user WHERE username = ?;
SELECT user_id FROM user WHERE username = ?;
INSERT INTO invitation (id_user_admin, id_user_invited, id_todo_list, accepted) VALUES (?, ?, ?, false);

-- Visulizar meus convites
SELECT user_id FROM user WHERE username = ?;
SELECT * FROM invitation AS i JOIN user AS u ON i.id_user_admin = u.user_id WHERE i.id_user_invited = ? AND i.accepted = 0;

-- Visualizar usuários
SELECT * FROM user WHERE username != ?;

-- Aceitar convite
SELECT user_id FROM user WHERE username = ?;
UPDATE invitation SET accepted = true WHERE id_user_invited = ? AND id_todo_list = ?;
INSERT INTO user_list (user_id, list_id) VALUES (?, ?);

-- Recusar convite
SELECT user_id FROM user WHERE username = ?;
DELETE FROM invitation WHERE id_user_invited = ? AND id_todo_list = ?;

-- Visualizar convites enviados
SELECT user_id FROM user WHERE username = ?;
SELECT t.list_id, t.name, t.create_date, t.last_mod, t.user_last_mod_id, t.user_admin_id 
  FROM user_list AS u 
    JOIN to_do_list as t 
    ON u.list_id = t.list_id 
  WHERE u.user_id = ?;

-- ----------------------------------------------------------------------
-- Consultas utilizadas para o sistema de lista de tarefas


SELECT * FROM to_do_list WHERE user_admin_id = ?
SELECT user_id FROM user WHERE username = ?

-- Criação
SELECT user_id FROM user WHERE username = ?
INSERT INTO to_do_list (name, create_date, last_mod, user_last_mod_id, user_admin_id) VALUES (?, NOW(), NOW(), ?, ?)

-- Exclusão
SELECT user_id FROM user WHERE username = ?
SELECT * FROM to_do_list WHERE user_admin_id = ? AND list_id = ?
DELETE FROM user_list WHERE list_id = ?
DELETE FROM invitation WHERE id_todo_list = ?
DELETE FROM task WHERE list_id = ?
DELETE FROM to_do_list WHERE list_id = ?

-- Edição
SELECT * FROM to_do_list WHERE list_id = ?

-- ----------------------------------------------------------------------
-- Consultas utilizadas para o sistema de tasks

-- Criação
INSERT INTO task (name, description, register_date, expire_date, completed, user_id_created, list_id) VALUES (?, ?, NOW(), ?, false, ?, ?)
SELECT user_id FROM user WHERE username = ?

-- Read
SELECT * FROM task WHERE list_id = ?

-- Edição
UPDATE task SET name = ?, description = ?, expire_date = ? WHERE task_id = ?
SELECT user_id FROM user WHERE username = ?
UPDATE to_do_list SET last_mod = NOW(), user_last_mod_id = ? WHERE list_id = ?

-- Marcação de tarefa realizada
UPDATE task SET completed = ? WHERE task_id = ?
SELECT user_id FROM user WHERE username = ?
UPDATE to_do_list SET last_mod = NOW(), user_last_mod_id = ? WHERE list_id = ?