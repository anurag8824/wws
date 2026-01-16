import mongoose, { Document, Schema } from "mongoose";

// Define the TypeScript interface for an Operation
export interface IMatkagame extends Document {

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
  Date:Date;
  result:string;
  roundid:string;
  isActive:boolean;



}

// Define the Mongoose schema
const MatkagameSchema: Schema = new Schema(
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
    Date:{
        type:Date,
       
    },
    result:{
        type:String,
        default:"pending"
       
    },
    roundid:{
        type:String,
       
    },
     isActive:{
        type:Boolean,
        default:true
       
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
export default mongoose.model<IMatkagame>("Matkagame", MatkagameSchema);
