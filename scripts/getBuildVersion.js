const exec = require('child_process').execSync;

const buildVersion = exec('git rev-parse --short HEAD')
    .toString()
    .trim();

module.exports = buildVersion;
