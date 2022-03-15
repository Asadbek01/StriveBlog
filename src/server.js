import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import UserRouter from "./service/user/index.js";
import BlogsRouter from "./service/blog/index.js";

const server = express();
const port = process.env.PORT;

server.use(express.json());
server.use(cors());

server.use("/users", UserRouter);
server.use("/blogs", BlogsRouter);


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