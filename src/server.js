import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import BlogsRouter from "./service/blog/index.js";
import AuthorRouter from "./service/author/index.js";
import { badRequestHandler, forbiddenError, genericErrorHandler, notFoundHandler, unauthorizedError } from "./errorHandlers.js";

const server = express();
const port = process.env.PORT;

/************************************** Enpoints **************************/

server.use("/author", AuthorRouter);
server.use("/blogs", BlogsRouter);

/************************************** Middleware **************************/
server.use(express.json());
server.use(cors());


/************************************** ErrorHandlers **************************/

server.use(notFoundHandler)
server.use(badRequestHandler)
server.use(forbiddenError)
server.use(genericErrorHandler)
server.use(unauthorizedError)


    /************************************** Connection **************************/

mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
    console.log("Connected to Mongo!");
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
        console.table(listEndpoints(server));
    });
});
mongoose.connection.on("error", (err) => {
    console.log(err);
}); 