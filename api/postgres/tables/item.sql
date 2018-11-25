create table item (
  item_id serial primary key,
  title varchar(50) not null,
  description text not null,
  image text not null,
  large_image text not null,
  price int default 0
);