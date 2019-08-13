const seed = require('./seedHelpers.js');
const pg = require('pg');
require('dotenv').config({path: '../.env'});

const pgConfig = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_LOCAL_HOST,
  database: process.env.POSTGRES_DB_NAME,
  //max: process.env.POSTGRES_MAX_CLIENT,
};

const pgPool = new pg.Pool(pgConfig);

function seedManager() {
  for (var i = 1; i <= 10; i++) {
    var projectQuery = 'insert into projects (name, startdate, enddate) values($1, $2, $3)';
    var projectObj = seed.generateProject(i);
    var projectValues = [projectObj.name, projectObj.startdate,     projectObj.enddate];
    pgPool.query(projectQuery, projectValues, (err, results) => {
      if (err) {
      console.log(err);
      }
      console.log('inserted number of rows : ' + results.rowCount);
    });
  }

  for (var i = 1; i <= 30; i++) {
    var employeeObj = seed.generateEmployee(i);
    var employeeQuery = 'insert into employees (name, teamid) values($1, $2)';
    var employeeValues = [employeeObj.name,employeeObj.teamid];

    pgPool.query(employeeQuery, employeeValues, (err, results) => {
      if (err) {
      console.log(err);
      }
      console.log('inserted number of rows : ' + results.rowCount);
    });
  }
}

seedManager();
