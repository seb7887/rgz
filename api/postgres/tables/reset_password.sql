create table reset_password (
  reset_id serial primary key,
  customer_id int not null,
  reset_token text not null,
  reset_token_expires float not null
);