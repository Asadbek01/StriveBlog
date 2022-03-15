import express from "express"
import  AuthorModel  from "../schemas/authorSchema.js"
const AuthorRouter = express.Router()
// 1
AuthorRouter.post("/", async (req, res, next) => {
    try {
        const newUser = new AuthorModel(req.body)
        await newUser.save()
        res.status(201).send(newUser)
    } catch (error) {
        next(error)
    }
})
// 2
AuthorRouter.get("/", async (req, res, next) => {
    try {
        const user = await AuthorModel.find()
        res.send(user)
    } catch (error) {
        next(error)
    }
})
// 3
AuthorRouter.get("/:id", async (req, res, next) => {
    try {
        const user = await AuthorModel.findById(req.params.id)
        res.status(201).send(user)
    } catch (error) {
        next(error)
    }
})
// 4
AuthorRouter.put("/:id", async (req, res, next) => {
    try {
        const user = await AuthorModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send(user)
    } catch (error) {
        next(error)
    }
})
// 5
AuthorRouter.get("/:id", async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id)
        res.status(201).send(user)
    } catch (error) {
        next(error)
    }
})
export default AuthorRouter