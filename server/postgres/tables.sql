CREATE TABLE IF NOT EXISTS users(
  id serial primary key,
  login varchar(128) UNIQUE NOT NULL,
  email varchar(128) UNIQUE NOT NULL,
  password varchar(128) NOT NULL,
  first_name varchar(128) NOT NULL,
  last_name varchar(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS employers(
  id serial primary key,
  department_id int REFERENCES departments(id),
  name varchar(128) NOT NULL,
  active boolean default 'false'
);

CREATE TABLE IF NOT EXISTS departments(
  id serial primary key,
  name varchar(128) NOT NULL
);
