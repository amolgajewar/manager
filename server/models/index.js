const pgPool = require('../db/index.js');

function readOneProject(id, callback) {
  var projectQuery =  `select id, name, to_char(startdate,'MM-DD-YYYY') as startdate, to_char(enddate, 'MM-DD-YYYY') as enddate from projects where id=$1`;
  var projectValues = [id];
  pgPool.query(projectQuery, projectValues, (err, results) => {
    if (err) {
      console.log(err);
    }
    callback(err, results.rows);
    console.log('result rows : ' + JSON.stringify(results.rows));
  });
}

function readAllProjects(callback) {
  var projectQuery =  `select id, name, to_char(startdate,'MM-DD-YYYY') as startdate, to_char(enddate, 'MM-DD-YYYY') as enddate from projects order by id`;
  var projectValues = [];
  pgPool.query(projectQuery, projectValues, (err, results) => {
    if (err) {
      console.log(err);
    }
    callback(err, results.rows);
    console.log('result rows : ' + JSON.stringify(results.rows));
  });
}

function writeOneProject(projectObj, callback) {
  var projectQuery = 'insert into projects (name, startdate, enddate) values($1, $2, $3)';
  var projectValues = [projectObj.name, projectObj.startdate,projectObj.enddate];
  pgPool.query(projectQuery, projectValues, (err, results) => {
    if (err) {
    console.log(err);
    }
    callback(err, results.rowCount);
    console.log('inserted number of rows : ' + results.rowCount);
  });
}

function updateOneProject(projectObj, callback) {
  var projectQuery = 'update projects set name=$1, startdate=$2, enddate=$3 where id=$4 returning *';
  var projectValues = [projectObj.name, projectObj.startdate,projectObj.enddate, projectObj.id];
  pgPool.query(projectQuery, projectValues, (err, results) => {
    if (err) {
    console.log(err);
    }
    callback(err, results.rows);
    console.log('updated rows with : ' + JSON.stringify(results.rows));
  });

}

function deleteOneProject(id, callback) {
  var projectQuery = 'delete from projects where id=$1 returning *';
  var projectValues = [id];
  pgPool.query(projectQuery, projectValues, (err, results) => {
    if (err) {
    console.log(err);
    }
    callback(err, results.rows);
    console.log('deleted row : ' + JSON.stringify(results.rows));
  });
}

module.exports = {
  readOneProject,
  readAllProjects,
  writeOneProject,
  updateOneProject,
  deleteOneProject
};

//readOneProject(1);
//readAllProjects();
//writeOneProject({ name: 'projectx', startdate: '1/1/2001', enddate: '1/1/ 2002'});
//updateOneProject({ id: 8, name: 'xyz', startdate: '1/1/2001', enddate: '1/1/2002'});
//deleteOneProject(9);


// function query() {

//   var query =  'select employees.id, employees.name, employees.teamid from projects right join employees on projects.id=employees.teamid where projects.id=$1';

//   var values = [2];

//   pgPool.query(query, values, (err, results) => {
//     if (err) {
//     console.log(err);
//     }
//     console.log('result rows : ' + JSON.stringify(results.rows));
//   });

// }