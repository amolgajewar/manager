drop database if exists manager;

create database manager;

\c manager;

create table employees (
  id serial PRIMARY KEY,
  name text,
  -- skills text[],
  -- experience int,
  teamid int
);

create table projects (
  id serial PRIMARY KEY,
  name text,
  startdate date,
  enddate date
);

-- run following command before seeding
-- psql postgres -f projectManagerSchema.sql

