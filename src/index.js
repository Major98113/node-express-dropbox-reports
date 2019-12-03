const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const log4js = require('log4js');
const errorsLogger = log4js.getLogger("errors");
const app = express();
require('./authentication/config-passport');

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    passport.authenticate('local', function(err, user) {
        if (err) {
            errorsLogger.error(err);
            return next(err);
        }
        if (!user) {
            errorsLogger.warn(err);
            return res.status(401).json({
                status: "failed",
                errors: 'Wrong username or password'
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            next();
        });
    })(req, res, next);
});

require("./resourses/users/newUsers/router")(app);
require("./resourses/users/topSalaries/router")(app);
require("./resourses/users/usersWithRewards/router")(app);

module.exports = app;