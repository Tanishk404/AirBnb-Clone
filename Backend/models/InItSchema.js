import { DBConnetion } from "../config/DB.js";
import mongoose, { mongo } from "mongoose";



const AllListHome = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        filename: {
            type: String,
        },
        url: {
            type: String,
            required: true
        }
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HostUser",
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],

    owneruser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SignUp"
    },

    coordinates: {
        type : {
            type: String,
            enum: ['Point'],
         
        },
        coordinate: {
            type: [Number],
  
  }
    },

    isHosted: {
        type: Boolean,
    },
    facilities: {
  kitchen: { type: Boolean, default: false },
  wifi: { type: Boolean, default: false },
  tv: { type: Boolean, default: false },
  lift: { type: Boolean, default: false },
  pool: { type: Boolean, default: false },
  parking: { type: Boolean, default: false },
  Ac: { type: Boolean, default: false },
  balcony: { type: Boolean, default: false },
  gym: { type: Boolean, default: false },
  hairDryer: { type: Boolean, default: false },
  cleaningProduct: { type: Boolean, default: false },
  conditioner: { type: Boolean, default: false },
  bodySoap: { type: Boolean, default: false },
  outdoorShower: { type: Boolean, default: false },
  hotWater: { type: Boolean, default: false },
  showerGel: { type: Boolean, default: false },
},

})


export const Data = mongoose.model("Data", AllListHome);