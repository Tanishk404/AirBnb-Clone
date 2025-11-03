import mongoose from "mongoose";


const Favoriates = new mongoose.Schema({
    originalId: { type: mongoose.Schema.Types.ObjectId, required: true,
        ref: ""
     },
     userfav: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SignUp"
     }
})

export const Favs = mongoose.model("Favoriates", Favoriates);