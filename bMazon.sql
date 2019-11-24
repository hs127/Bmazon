
CREATE DATABASE bmazon_DB;

USE bmazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,4) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

//departments - Clothing, Technology, Kitchen, Home, Pet Supplies, Books 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Instant Pot", "Kitchen", 100, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Purple Coat", "Clothing", 30, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Alexa Dot", "Technology", 80, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spongebob Bed Set", "Home", 60, 9);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Food", "Pet Supplies", 60, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tank", "Pet Supplies", 20, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Harry Potter", "Books", 20, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AirHead", "Books", 15, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cat Food", "Pet Supplies", 10, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cap", "Clothing", 5, 10);



