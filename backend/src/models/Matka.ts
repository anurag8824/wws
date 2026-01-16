import mongoose, { Document, Schema } from "mongoose";

// Define the TypeScript interface for an Operation
export interface IMatka extends Document {

  gamename: string;
  id: string;
  opentime: {
  hour: Number,   // 9
  minute: Number // 0
},
closetime: {
  hour: Number,   // 17
  minute: Number // 15
},
  isActive:boolean;



}

// Define the Mongoose schema
const MatkaSchema: Schema = new Schema(
  {
    gamename:{
        type:String,
       
    },
    id:{
        type:String,
       
    },
     opentime: {
    hour: Number,
    minute: Number
  },
  closetime: {
    hour: Number,
    minute: Number
  },
   
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
export default mongoose.model<IMatka>("Matka", MatkaSchema);
