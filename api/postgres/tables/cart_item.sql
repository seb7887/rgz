create table cart_item (
  cart_item_id serial primary key,
  cart_id int not null,
  quantity int default 1,
  item_id int not null,
  customer_id int not null
);