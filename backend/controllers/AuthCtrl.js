const config = require('../config'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  UserModel = require('../models').schemas.UserSchema,
  _ = require('lodash'),
  moment = require('moment'),
  BearerStrategy = require('passport-http-bearer');

module.exports = function(passport) {

  passport.use(
    new BearerStrategy((token, done) => {
      UserModel.findOne({
        where: {
          access_token: token,
          updatedAt: {
            $gt: moment().add(-1, 'days').format()
          }
        }
      })
        .then(user => {

          console.log(user);

          return done(null, user, {scope: 'all'})

        })

    })
  );

  passport.serializeUser((user, callback) =>
    callback(null, user)
  );

  passport.deserializeUser((user, callback) =>
    callback(null, user)
  );

  passport.use(new GoogleStrategy(config.oauth, (accessToken, refreshToken, profile, done) => {
      UserModel.findOne({where: {googleId: profile.id}})
        .then(user =>
          user ? UserModel.update(
            {access_token: accessToken},
            {where: {googleId: profile.id}}
          ) : UserModel.create(
            {googleId: profile.id, access_token: accessToken}
          )
        )
        .then((record) => {
          done(null, _.merge({access_token: accessToken}, record.dataValues))
        })
        .catch(err => done(err))
    }
  ));

};
