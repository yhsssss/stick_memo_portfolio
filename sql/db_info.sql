
create database myboard;
use myboard;

create table memo(
  id int auto_increment primary key,
  memo text,
  bgcolor varchar(20)
);

create table post(
	id int auto_increment primary key,
    title varchar(60) null,
    description text null,
    date datetime,
    author_if int default 1,
    views int,
    password varchar(4) default '0000'
);