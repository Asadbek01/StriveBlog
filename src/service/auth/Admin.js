import createHttpError from "http-errors";

export const adminOnlyMiddleware = (req, res, next) => {
  if (req.author.role === "admin") {
    next()
  }else{
    next(createHttpError(403, "Only Admin is allowed!"))
  }
}