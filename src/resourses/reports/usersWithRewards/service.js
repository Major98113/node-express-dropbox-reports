const loadFileFromDropbox = require('../../../common/utils/loadFileFromDropbox');
const getBadges = require('./mapper');
const newUsersValidation = require('../../../validation/newUsersValidation');
const errorResponse = require('../../../common/utils/errorsHandler');
const paginationFilter = require('../../../common/utils/paginationFilter');

module.exports = async (request, response) => {
    newUsersValidation("newUsersRequestSchema")(request, response);
    try{
        const csvRow = await loadFileFromDropbox();
        const users = getBadges(csvRow);
        const usersJsonObject = paginationFilter(users, request.body);
        response.status(200).json({
            "users": usersJsonObject
        });
    }
    catch(error){
        errorResponse(response, error);
    }

};