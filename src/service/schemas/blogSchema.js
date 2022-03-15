import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const BlogModel = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String},
    content: { type: String, required: true },
    readTime: {
      value: { type: Number, required: true},
      unit: {type: String, required: true }        
  },
  author: {
      name: {type: String, required: true},
      avatar: {type: String, required: true}        
  },
  content: { type: String, required: true}  
},

  {
    timestamps: true, 
  }
)
//  userSchema.pre("save", async function(next){
// const newUser = this
// const passwordPL = newUser.password
// if(newUser.isModified("password")) {
//   const hash = await bcrypt.hash(passwordPL, 10)
//   newUser.password = hash
// }
// next()
// })

//  userSchema.methods.toJson = function(){
//    const userDocument = this 
//    const userProperty = userDocument.toObject()
//      delete userProperty.password

//      return userProperty
   
//  }
//  userSchema.statics.checkCredential = async function (authorName, passwordPL ) {

//   const user = await this.findOne({ authorName }) 

//   if (user) {
//     const isMatch = await bcrypt.compare(passwordPL, user.password)
//     if (isMatch) {
//       return user
//     } else {
//       return null
//     }
//   } else {
//     return null
//   }
// }


export default model("Blog", BlogModel) 
