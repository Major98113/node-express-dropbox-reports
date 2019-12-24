const loadFileFromDropbox = require('../../../common/dropbox/loadFileFromDropbox');
const getFilteredUsers = require('./mapper');
const paginationFilter = require('../../../common/utils/paginationFilter');

module.exports = async (request, response, next) => {
    try{
        const csvRow = await loadFileFromDropbox();
        const users = getFilteredUsers(csvRow);
        const usersJsonObject = paginationFilter(users, request.query);
        response.status(200).json({
            "users": usersJsonObject
        });
    }
    catch(error) {
        next(error);
    }

};