import express from "express"
import BlogModel from "../schemas/blogSchema.js"
const BlogsRouter = express.Router()
// 1
BlogsRouter.post("/", async (req, res, next) => {
    try {
        const blog = new BlogModel(req.body)
        const {_id} = await blog.save()
        res.status(201).send({_id})
    } catch (error) {
        next(error)
    }
})
// 2
BlogsRouter.get("/", async (req, res, next) => {
    try {
        const blog = await BlogModel.find()
        res.send(blog)
    } catch (error) {
        next(error)
    }
})
// 3
BlogsRouter.get("/:id", async (req, res, next) => {
    try {
        const blog = await BlogModel.findById(req.params.id)
        res.send(blog)
    } catch (error) {
        next(error)
    }
})
// 4
BlogsRouter.put("/:id", async (req, res, next) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send(blog)
    } catch (error) {
        next(error)
    }
})
// 5
BlogsRouter.get("/:id", async (req, res, next) => {
    try {
        const blog = await BlogModel.findByIdAndDelete(req.params.id)
        res.send(blog)
    } catch (error) {
        next(error)
    }
})

export default BlogsRouter