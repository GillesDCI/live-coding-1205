import User from './models/User.js';
import passportJWT from 'passport-jwt';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const configureJwtStrategy = (passport) => {
    passport.use("jwt", new JWTStrategy(
        {
            jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET
    },(jwtPayload, done) => {
        return( 
           User.findById(jwtPayload.sub)
               .select("_id firstname lastname username email roles")
               .then((user)=> {
                return done(null,user)
               })
               .catch((err) => {
                return done(err)
               })
        )
    }))
}

export default configureJwtStrategy;