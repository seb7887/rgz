-- Deploy fresh database tables:
\i '/docker-entrypoint-initdb.d/tables/types.sql'
\i '/docker-entrypoint-initdb.d/tables/customer.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'
\i '/docker-entrypoint-initdb.d/tables/reset_password.sql'
\i '/docker-entrypoint-initdb.d/tables/item.sql'
\i '/docker-entrypoint-initdb.d/tables/cart_item.sql'
\i '/docker-entrypoint-initdb.d/tables/order_item.sql'
\i '/docker-entrypoint-initdb.d/tables/sale_order.sql'

-- For testing purposes only. This file will add dummy data:
\i '/docker-entrypoint-initdb.d/seed/seed.sql'