const passport = require('koa-passport');
const passportJWT = require('passport-jwt');
const userModel = require('modules/users/user.model');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromHeader('token')
};

module.exports = async() => {

    const strategy = new Strategy(params, (payload, done) => {
        userModel.findById(payload.id).populate({
            'path': 'role',
            'select': 'role title'
        }).exec((err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    });
    passport.use(strategy);

    // return
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: (ctx, next) => {
            passport.authenticate("jwt", cfg.jwtSession, (err, user, info) => {
                if (err) { return next(err); }
                if (!user) { return res.redirect('/' + process.env.ADMIN_FOLDER_NAME) }
                if (user) {
                    req.user = user;
                    return next();
                } else {
                    return res.redirect('/' + process.env.ADMIN_FOLDER_NAME);
                }

            })(ctx, next);
        },
        authenticateFront: (ctx, next) => {
            passport.authenticate("jwt", cfg.jwtSession, (err, user, info) => {
                if (err) { return next(err); }
                if (!user) { return res.redirect('/' + process.env.FRONT_FOLDER_NAME) }
                if (user) {
                    req.user = user;
                    return next();
                } else {
                    return res.redirect('/' + process.env.FRONT_FOLDER_NAME);
                }

            })(ctx, next);
        }
    };
} 