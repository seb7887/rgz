create table sale_order (
	order_id serial primary key,
	cart_id int not null,
	customer_id int not null,
	total int default 0,
	charge text not null
);