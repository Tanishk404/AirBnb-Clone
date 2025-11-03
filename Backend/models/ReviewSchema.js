import mongoose from "mongoose";


const ReViewSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
   
    },
    owneruser: {
        type: mongoose.Schema.ObjectId,
        ref: "SignUp"
    }
})

export const ReviewsModel = mongoose.model("Review", ReViewSchema);
