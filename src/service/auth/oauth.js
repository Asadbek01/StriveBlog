import passport from "passport"
import GoogleStrategy  from "passport-google-oauth20"
import AuthorModel from "../schemas/authorSchema.js";
import { JWTAUTHANTICATION } from "../auth/jwttool.js";

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.API_URL}/author/googleRedirect`
},
async (accessToken, refreshToken, profile, passportNext) => {
    try {
     
      console.log(profile)
      const author = await AuthorModel.findOne({ email: profile.emails[0].value })

      if (author) {
        const token = await JWTAUTHANTICATION(author)
        passportNext(null, { token, role: author.role })
      } else {
        // 4. Else if the user is not in our db --> add the user to db and then create token(s) for him/her

        const newAuthor = new AuthorModel({
          name: profile.name.givenName,
          surname: profile.name.familyName,
          email: profile.emails[0].value,
          googleId: profile.id,
        })

        const savedAuthor = await newAuthor.save()
        const token = await JWTAUTHANTICATION(savedAuthor)

        passportNext(null, { token })
      }
    } catch (error) {
      passportNext(error)
    }
  }
)


passport.serializeUser((data, passportNext) => {
  passportNext(null, data)
})

export default googleStrategy
