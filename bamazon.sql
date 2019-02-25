CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(500) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(13, 2) NOT NULL,
stock_quantity INT NOT NULL, 
PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Petman", "Robotics", 65000, 10000);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Asimo", "Robotics", 81500, 2500);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Atlas", "Robotics", 101200, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Pre-Owned MacBook Pro 15inch 16GB i9 Processor 1TB SSD", "Electronics", 4250, 80);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("New Xbox One X 500GB Black", "Electronics", 400, 15300);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("New Red 2019 Honda Civic EX", "Automobile", 21900, 24);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("New Blue 2019 Honda Accord EX", "Automobile", 23490, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("New Black 2019 Mercedes AMG GT 63S 4-Door", "Automobile", 160999, 32);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("2018 Koenigsegg Agera Rs V8", "Automobile", 2500000, 10);
