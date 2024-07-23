-- create_tables.sql
CREATE DATABASE IF NOT EXISTS friends_db;

USE friends_db;

CREATE TABLE IF NOT EXISTS friends (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    joined_date DATE
);
