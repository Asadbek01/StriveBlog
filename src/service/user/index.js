import express from "express"
import  UserModel  from "../schemas/userSchema.js"
const UserRouter = express.Router()
// 1
UserRouter.post("/", async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body)
        await newUser.save()
        res.status(201).send(newUser)
    } catch (error) {
        next(error)
    }
})
// 2
UserRouter.get("/", async (req, res, next) => {
    try {
        const user = await UserModel.find()
        res.send(user)
    } catch (error) {
        next(error)
    }
})
// 3
UserRouter.get("/:id", async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id)
        res.status(201).send(user)
    } catch (error) {
        next(error)
    }
})
// 4
UserRouter.put("/:id", async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send(user)
    } catch (error) {
        next(error)
    }
})
// 5
UserRouter.get("/:id", async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id)
        res.status(201).send(user)
    } catch (error) {
        next(error)
    }
})
export default UserRouter