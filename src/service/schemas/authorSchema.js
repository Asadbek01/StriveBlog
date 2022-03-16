import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const {Schema, model} = mongoose

const AuthorModel = new Schema (
    {
        name:{ type: String, required: [true, "Please enter insert your name"],},
        email:{ type: String, required: [true, "Please enter insert your email"]},
        password:{ type: String,required: [true, "Please enter insert your password"]},
        role:{ type: String, enum: ["user", "admin"], default: "user"},
        refreshToken: {type: String}
    },
    {
        timestamps: true
    }
)

 AuthorModel.pre("save", async function(next){
const author = this
const passwordPL = author.password
if(author.isModified("password")) {
  const hash = await bcrypt.hash(passwordPL, 10)
  author.password = hash
}
next()
})

 AuthorModel.methods.toJson = function(){
   const authorDoucumnet = this 
   const authorProperty = authorDoucumnet.toObject()
     delete authorProperty.password

     return authorProperty
   
 }
 AuthorModel.statics.checkCredentials = async function (email, passwordPL ) {

  const author = await this.findOne({ email }) 

  if (author) {
    const isMatch = await bcrypt.compare(passwordPL, author.password)
    if (isMatch) {
      return author
    } else {
      return null
    }
  } else {
    return null
  }
}
export default model("Author", AuthorModel)