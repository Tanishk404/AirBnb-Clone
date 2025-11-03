
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


export const UserSchema = new  mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    avatar: { type: String, default: "" }

})

UserSchema.plugin(passportLocalMongoose,{ usernameField: 'email',
usernameUnique: false  
});

export const UserModel = mongoose.model("SignUp", UserSchema);