
-- Host: localhost    Database: home_db
-- ------------------------------------------------------

-- To use home_db
USE home_db;

-- To drop existing tables if they exist to avoid conflicts
DROP TABLE IF EXISTS home;
DROP TABLE IF EXISTS user;

-- To Create the user table to store user data
CREATE TABLE user (
    username VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL
);

-- To Create the home table to store home data 
CREATE TABLE home (
    street_address VARCHAR(255) PRIMARY KEY,
    state VARCHAR(255) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    sqft DECIMAL(10,2) NOT NULL,
    beds INT NOT NULL,
    baths INT NOT NULL,
    list_price DECIMAL(15,2) NOT NULL
);

-- To create the user_home_tb junction table for user and home table
CREATE TABLE user_home_tb (
    username VARCHAR(255),
    street_address VARCHAR(255),
    PRIMARY KEY (username, street_address),
    FOREIGN KEY (username) REFERENCES user(username),
    FOREIGN KEY (street_address) REFERENCES home(street_address)
);

-- To insert (username and email) user data into the user table from existing user_home table
INSERT INTO user (username, email)
SELECT DISTINCT username, email
FROM user_home; 
-- To insert home data into the home table excluding user data
INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price
FROM user_home;

-- To insert data into the user_home_tb junction table from user_home table
INSERT INTO user_home_tb (username, street_address)
SELECT username, street_address
FROM user_home;


