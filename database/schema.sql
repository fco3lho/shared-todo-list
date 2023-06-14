-- ----------------------------------------------------------------------
-- Banco de Dados

CREATE DATABASE todolist;
USE todolist;

-- ----------------------------------------------------------------------
-- Definição do esquema de Banco de Dados

CREATE TABLE user (
    user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(128) NOT NULL,
    username VARCHAR(16) NOT NULL
);

CREATE TABLE to_do_list (
    list_id INTEGER PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(32) NOT NULL, -- receber
    create_date DATETIME NOT NULL, -- NOW
    last_mod DATETIME,
    user_last_mod_id INTEGER, 
    user_admin_id INTEGER NOT NULL, -- receber
    FOREIGN KEY (user_last_mod_id) REFERENCES user (user_id),
    FOREIGN KEY (user_admin_id) REFERENCES user (user_id)
);

CREATE TABLE task (
    task_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL, -- receber
    description VARCHAR(128) NOT NULL, -- receber
    register_date DATETIME NOT NULL, -- NOW
    expire_date DATETIME NOT NULL, -- receber
    completed BOOL NOT NULL, -- false
    user_id_created INTEGER NOT NULL, -- receber
    list_id INTEGER NOT NULL, -- params
    FOREIGN KEY (user_id_created) REFERENCES user (user_id),
    FOREIGN KEY (list_id) REFERENCES to_do_list (list_id)
);

CREATE TABLE invitation (
    id_user_admin INTEGER,
    id_user_invited INTEGER,
    id_todo_list INTEGER,
    accepted BOOL,
    PRIMARY KEY (id_user_admin, id_user_invited, id_todo_list),
    FOREIGN KEY (id_user_admin) REFERENCES user (user_id),
    FOREIGN KEY (id_user_invited) REFERENCES user (user_id),
    FOREIGN KEY (id_todo_list) REFERENCES to_do_list (list_id)
);

CREATE TABLE user_list (
    user_id INTEGER,
    list_id INTEGER,
    PRIMARY KEY (user_id, list_id),
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (list_id) REFERENCES to_do_list (list_id)
);
