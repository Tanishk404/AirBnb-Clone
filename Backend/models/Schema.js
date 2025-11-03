import mongoose from "mongoose";


export const userSchema = new mongoose.Schema({
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
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    owneruser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SignUp"
    },
    country: {
        type: String
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

})

// export const Data = mongoose.model("Data", userSchema);
export const AllListings = mongoose.model("AllListing", userSchema);