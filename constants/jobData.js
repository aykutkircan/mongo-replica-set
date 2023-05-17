const {
  uniqueNamesGenerator,
  adjectives,
  colors,
} = require("unique-names-generator");

const customConfig = {
  dictionaries: [adjectives, colors],
  separator: "-",
  length: 2,
};

const jobData = {
  job_title: uniqueNamesGenerator(customConfig),
  job_salary: "1000",
};

module.exports = jobData;
