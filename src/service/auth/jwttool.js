import createError from "http-errors"
import jwt from "jsonwebtoken"
export const  JWTAUTHANTICATION = async author =>{
  
       const accessToken = await generateToken({_id: author._id, role: author.role})
       const refreshToken = await generateRefreshToken({_id: author._id})

       author.refreshToken = refreshToken
       await author.save()
       return {accessToken, refreshToken}
  
   
}



 const generateToken = payload =>
new Promise((resolved, rejected) =>
jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "15m"}, (err, token) =>{
    if (err) rejected (err)
    else resolved(token)
})
)

 export const verifyToken = token => 
new Promise((res, rej) =>
jwt.verify(token, process.env.JWT_SECRET, (err , payload) =>{
    if (err) rej(err)
    else res(payload)
})
) 

const generateRefreshToken = payload =>
new Promise((resolved, rejected) =>
jwt.sign(payload, process.env.REFRESH_SECRET,{expiresIn: "1 week"}, (err, token) =>{
    if (err) rejected (err)
    else resolved(token)
})
)

 export const verifyRefreshToken = token => 
new Promise((res, rej) =>
jwt.verify(token, process.env.REFRESH_SECRET, (err , payload) =>{
    if (err) rej(err)
    else res(payload)
})
) 

export const verifyRefreshTokenAndGenerateNewToken = async currentRefreshToken =>{
    try {
         const payload = await verifyRefreshToken(currentRefreshToken)
         const author = await AuthorSchema.findById(payload._id)
      if(!author){
           throw new createError(404, `Author with id ${payload._id} didnt find`)
      }
      console.log(author.refreshToken)
      console.log(currentRefreshToken)
      if(author.refreshToken && author.refreshToken === currentRefreshToken){
           const {accesstoken, refreshToken} = await jwtAuth(author)
           return {accesstoken, refreshToken}
      }else{
           throw new createError(401, "Refresh token not valid!")
      }
         } catch (err) {
              throw new createError(401, "Refresh token expired!")
    }
}