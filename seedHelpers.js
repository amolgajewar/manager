const loremIpsum = require("lorem-ipsum").loremIpsum;

const generateWords = (num) => {
  return  loremIpsum({
    count: num,        // Number of "words"
    format: "plain",   // "plain" or "html"
    units: "words"     // paragraph(s), "sentence(s)", or "word(s)"
  })
};

const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

function getRandomDate(date1, date2){

  date1 = new Date(date1).getTime();
  date2 = new Date(date2).getTime();

  return new Date(getRandomNum(date2,date1)).toLocaleDateString();
}

var skills = ['React', 'Express', 'Styled Components',
              'CSS', 'Postgres', 'SQL', 'Cassandra',
              'Redux', 'Docker', 'AWS'];

const generateSkills = function() {
  const startIndex = getRandomNum(0, 3);
  const endIndex = getRandomNum(4, 10);
  return skills.slice(startIndex, endIndex);
}

const generateEmployee = function(id) {
  var employeeObj = {};
  employeeObj.id = id;
  employeeObj.name = generateWords(2);
  employeeObj.teamid = getRandomNum(1,11);
  return employeeObj;
};

const generateProject = function(id) {
  var projectObj = {};
  projectObj.id = id;
  projectObj.name = generateWords(2);
  projectObj.startdate = getRandomDate('1/1/2001', '1/1/2019');
  projectObj.enddate = getRandomDate(projectObj.startdate, '1/1/2019');
  return projectObj;
};

//console.log(JSON.stringify(generateProject(1)));
//console.log(JSON.stringify(generateEmployee(1)));

module.exports = {
  generateEmployee,
  generateProject
};


