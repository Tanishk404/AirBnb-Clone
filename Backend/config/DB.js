import mongoose from "mongoose";


export const DBConnetion = async () => {
    await mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }).then((result) => {
        console.log("Connection success")
    }).catch((err) => {
        console.log("Somthing wrong in db connection", err.message)
    });
}



