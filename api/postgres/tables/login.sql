create table login (
  id serial primary key,
  hash varchar(50) not null,
  email text unique not null
);