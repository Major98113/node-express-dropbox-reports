const checkUser = require('../../../authentication/checkUser');
const service = require('./service');

module.exports = app => app.post('/usersWithReward', checkUser, service);