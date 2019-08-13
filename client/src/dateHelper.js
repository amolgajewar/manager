var month = [1,2,3,4,5,6,7,8,9,10,11,12];

var year = [2019,2020,2021,2022,2025,2026];

var days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

var getDaysInMonth = function(month,year) {
  return new Date(year, month, 0).getDate();
};

module.exports = {
  year,
  month,
  days,
  getDaysInMonth
};