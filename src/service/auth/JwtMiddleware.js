import createHttpError from "http-errors";
import { verifyToken } from "../auth/jwttool.js";

export const JwtMiddleware = async(req, res, next) =>{
    if(!req.headers.authorization){
        next(createHttpError(401, "Please provide bearer token"))
    }else{
        try {
            const token = req.headers.authorization.replace("Bearer ", "")
            const payload = await verifyToken(token)
            req.author = {
                _id: payload._id,
                role: payload.role
               }
            next()
           } catch (error) {
            next(createHttpError(401, 'Token is invalid'))
        }
    }
}