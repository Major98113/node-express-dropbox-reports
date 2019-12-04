const log4js = require('log4js');
log4js.configure('./config/log4js.json');
const errorsLogger = log4js.getLogger("errors");

const app = require('./src');
const port = process.env.PORT || 3000;


app.listen(port, function (err) {
    try{
        if (err) {
            throw new Error(err);
        }
        console.log(`server is listening on ${port}...`)
    }
    catch(error){
        errorsLogger.error(error);
    }
});