create table customer (
  customer_id serial primary key,
  name varchar(50) not null,
  email text unique not null,
  permissions permission[]
);