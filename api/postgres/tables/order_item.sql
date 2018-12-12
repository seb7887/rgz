create table order_item (
  order_item_id serial primary key,
  title varchar(50) not null,
	brand varchar(50) not null,
	model varchar(50) not null,
	gender gender_type not null,
	product product_type not null,
	description text not null,
	image text not null,
	large_image text not null,
	price int default 0,
  quantity int default 1,
  order_id int not null
);