const csv=require('csvtojson');
const config = require('../../config');

module.exports =  getNewUsers = (app) =>{
    app.post('/getNewUsers', (request, response) => {
        config.dropbox.DropboxWebApi.filesDownload({path: config.dropbox.pathToReports})
            .then( resp => {
                const users = resp.fileBinary.toString();
                csv({
                    noheader:true,
                    output: "csv"
                })
                    .fromString(users)
                    .then((csvRow)=>{
                        console.log(csvRow);
                        const usersJsonObject = csvRow.slice(1).map( user => {
                            const finishedInfo = {};
                            for( let i = 0; i < csvRow[0].length; i++ ){
                                finishedInfo[csvRow[0][i]] = user[i];
                            }
                            return finishedInfo;
                        });
                        response.send({
                            "users": usersJsonObject
                        });
                    })

                //response.send("Ok");
            })
            .catch( error => {
                console.error(error);
                response.send("Something went wrong")
            });

    });
};