import express from "express"
import { adminOnlyMiddleware } from "../auth/Admin.js"
import { MainAuthMiddleware } from "../auth/mainAuthMiddleware.js"
import  AuthorModel  from "../schemas/authorSchema.js"
const AuthorRouter = express.Router()
// 1
AuthorRouter.post("/",  async (req, res, next) => {
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
AuthorRouter.get("/", MainAuthMiddleware, async (req, res, next) => {
    try {
        const author = await AuthorModel.find()
        res.send(author)
    } catch (error) {
        next(error)
    }
})
// 3
AuthorRouter.get("/:me", MainAuthMiddleware, async (req, res, next) => {
    try {
     
        res.status(200).send(req.author)
    } catch (error) {
        next(error)
    }
})

AuthorRouter.get("/:id", adminOnlyMiddleware, async (req, res, next) => {
    try {
        const author = await AuthorModel.findById(req.params.id)
        res.status(201).send(author)
    } catch (error) {
        next(error)
    }
})
// 4
AuthorRouter.put("/:id", async (req, res, next) => {
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

// AuthorRouter.put("/me/stories", MainAuthMiddleware, async (req, res, next) => {
//     try {
//       req.author.name = "Asrorbek"
//       await req.user.save() 
  
//       res.send()
//     } catch (error) {
//       next(error)
//     }
//   })






export default AuthorRouter