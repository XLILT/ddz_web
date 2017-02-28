# create database
CREATE DATABASE IF NOT EXISTS `xl_ddz` DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

USE `xl_ddz`;

# create tables
DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `user`(
    id int not null auto_increment,
    name char(20) not null,
    passwd char(20) not null,
    sex int not null default '0',

    primary key(id),
    unique key k_name(name) using btree
)
ENGINE=InnoDB;
