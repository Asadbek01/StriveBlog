import express from "express"
import createError from "http-errors"
import { adminOnlyMiddleware } from "../auth/Admin.js"
import { JwtMiddleware } from "../auth/JwtMiddleware.js"
import { JWTAUTHANTICATION, verifyRefreshTokenAndGenerateNewToken } from "../auth/jwttool.js"
import { MainAuthMiddleware } from "../auth/mainAuthMiddleware.js"
import  AuthorModel  from "../schemas/authorSchema.js"
import passport from "passport"
const AuthorRouter = express.Router()
// 1
AuthorRouter.post("/register",  async (req, res, next) => {
    try {
        console.log(req.body)
        const author = new AuthorModel(req.body)
       const {_id} = await author.save()
        res.status(201).send({_id}) 
        
    } catch (error) {
        next(error)
    }
})
// 2
AuthorRouter.get("/", JwtMiddleware,adminOnlyMiddleware, async (req, res, next) => {
    try {
        const author = await AuthorModel.find()
        res.send(author)
    } catch (error) {
        next(error)
    }
})
// 3
AuthorRouter.get("/me",  JwtMiddleware, async (req, res, next) => {
    try {
     
      const author = await AuthorModel.findById(req.author._id)
      res.send(author)
    } catch (error) {
        next(error)
    }
})
AuthorRouter.put("/me", MainAuthMiddleware, async (req, res, next) => {
    try {
        req.author.role = "admin"
        req.author.name = "Asadbek"
      req.author.email = "asadbek.azamjonov@gmail.com"
      await req.author.save() 
      res.send()
    } catch (error) {
      next(error)
    }
})

AuthorRouter.get("/googleLogin",passport.authenticate("google", { scope: ["email", "profile"] })) 

AuthorRouter.get(
  "/googleRedirect",
  passport.authenticate("google"),
  async (req, res, next) => {
    try {
      console.log("TOKENS: ", req.authors.token)
      
      res.redirect(
        `${process.env.FE_URL}?accessToken=${req.authors.token.accessToken}&refreshToken=${req.author.token.refreshToken}`
      )
    } catch (error) {
      next(error)
    }
  }
)
AuthorRouter.get("/:id", MainAuthMiddleware, adminOnlyMiddleware, async (req, res, next) => {
    try {
        const author = await AuthorModel.findById(req.params.id)
        res.status(201).send(author)
    } catch (error) {
        next(error)
    }
})
// 4
AuthorRouter.put("/:id", MainAuthMiddleware, async (req, res, next) => {
    try {
        const author = await AuthorModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send(author)
    } catch (error) {
        next(error)
    }
})
// 5
AuthorRouter.get("/:id", async (req, res, next) => {
    try {
        const author = await AuthorModel.findByIdAndDelete(req.params.id)
        res.status(201).send(author)
    } catch (error) {
        next(error)
    }
})

AuthorRouter.post("/login",  async (req, res, next) => {
    try {
     const { email, password} = req.body
     const author = await AuthorModel.checkCredentials(email, password)
      if(author){
          const {accessToken , refreshToken} = await JWTAUTHANTICATION(author)
          res.send({accessToken, refreshToken})
      }else{
        next( createError(401, "Crediantials are not ok"))
    }
    } catch (error) {
      next(error)
    }
  })

  AuthorRouter.post("/refreshTokens",  async (req, res, next) => {
    try {
     const { currenRefreshToken } = req.body
    const [accessToken, refreshToken] = await verifyRefreshTokenAndGenerateNewToken(currenRefreshToken)
          res.send({accessToken, refreshToken})
    } catch (error) {
      next(error)
    }
  })








export default AuthorRouter