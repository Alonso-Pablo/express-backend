import passport from 'passport'
import passportLocal from 'passport-local'
import service from '../services/user/user.service'
import { Strategy, ExtractJwt } from 'passport-jwt'

const secret = process.env.JWT_SECRET as string
const localStrategy = passportLocal.Strategy
const JWTStrategy = Strategy
const ExtractJWT = ExtractJwt

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      service.postUser({ email, password })
        .then(user => done(null, user))
        .catch(err => done(err))
    }
  )
)

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      service.getUserByEmail(email)
        .then(async (user) => {
          if (!user) {
            return done(null, false, { message: 'User not found' })
          }

          const validate = await service.isValidPassword(password, user.password)
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' })
          }

          return done(null, user, { message: 'Logged in Successfully' })
        })
        .catch(err => done(err))
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      secretOrKey: secret,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (err) {
        done(err)
      }
    }
  )
)
