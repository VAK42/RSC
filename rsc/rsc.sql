CREATE TABLE users (
  user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
  email VARCHAR(100) NOT NULL, 
  fullname VARCHAR(100) NOT NULL, 
  username VARCHAR(100) NOT NULL, 
  password VARCHAR(250) NOT NULL, 
  phone VARCHAR(15) NOT NULL
);
CREATE TABLE users2 (
  pd_name VARCHAR(100), 
  qtt INT NOT NULL, 
  price INT NOT NULL, 
  total INT NOT NULL, 
  user_id INT, 
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE feedback (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, 
  name VARCHAR(100) NOT NULL, 
  email VARCHAR(100) NOT NULL, 
  feedback VARCHAR(2500) NOT NULL
);
CREATE TABLE rspwd (
  email VARCHAR(100) NOT NULL, 
  token VARCHAR(10) NOT NULL, 
  exp VARCHAR(100) NOT NULL
);
CREATE TABLE store (
  img VARCHAR(255) NOT NULL, 
  name VARCHAR(100) NOT NULL, 
  path VARCHAR(255) NOT NULL, 
  price INT(20) NOT NULL, 
  description TEXT
);
CREATE TABLE membership (
  name VARCHAR(100) NOT NULL, 
  ft1 VARCHAR(100) NOT NULL, 
  ft2 VARCHAR(100) NOT NULL, 
  ft3 VARCHAR(100) NOT NULL, 
  ft4 VARCHAR(100) NOT NULL, 
  ft5 VARCHAR(100) NOT NULL, 
  price INT(20) NOT NULL
);
CREATE TABLE events (
  img VARCHAR(255) NOT NULL, 
  img2 VARCHAR(255) NOT NULL, 
  name VARCHAR(100) NOT NULL, 
  path VARCHAR(255) NOT NULL, 
  description TEXT
);
CREATE TABLE cts (
  icon VARCHAR(100) NOT NULL, 
  text VARCHAR(255) NOT NULL
);
CREATE TABLE cts2 (
  map VARCHAR(5000) NOT NULL, 
  description TEXT,
  description2 TEXT
);
CREATE TABLE mbs (
  img VARCHAR(255) NOT NULL, 
  text VARCHAR(255) NOT NULL
);
CREATE TABLE dashboard (
  id SERIAL PRIMARY KEY, 
  date DATE, 
  week INT, 
  visitors INT, 
  revenue DECIMAL(10, 2), 
  purchasedCustomer VARCHAR(100), 
  totalCustomers INT, 
  sellingProduct VARCHAR(100)
);
CREATE TABLE admin (
  token VARCHAR(255)
);