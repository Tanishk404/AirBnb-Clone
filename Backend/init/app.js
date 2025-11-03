
import { DBConnetion } from "../config/DB.js";
import { Data } from "../models/InItSchema.js";
import initData from "./data.js";
import { UserModel } from "../models/Auth.js";
import mongoose from "mongoose";
import { AllListings } from "../models/Schema.js";
import { HomeDat } from "./homeInit.js";


let hd = HomeDat
hd = hd.map(own => ({
    ...own,
    owneruser: new mongoose.Types.ObjectId('68ec9f2f2806203968f988a7')
}))




// Data.deleteMany().then((result) => {
//     console.log("Deleted Successfully");
// }).catch((err) => {
//     console.log("Somthing wrong in deletting process", err);
// })



// let d = initData.data;
// d = d.map(own => ({
//     ...own,
//     owneruser: new mongoose.Types.ObjectId('68ec9f2f2806203968f988a7')
// }))
// Data.insertMany(d).then((result) => {
  
//     console.log("Inserted successfully", result);

// }).catch((err) => {
//     console.log("Somthing went wrong in inserting data", err);
// })


