import mongoose from "mongoose"

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
  authors:[{type:Schema.Types.ObjectId, ref:"Author"}]
},

  {
    timestamps: true, 
  }
)



export default model("Blog", BlogModel) 
