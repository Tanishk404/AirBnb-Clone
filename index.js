import express from 'express'
import mongoose from 'mongoose'
import path, { dirname } from 'path';
import { fileURLToPath }  from 'url';
import { UserRoute } from './Backend/routes/Routes.js';
import { DBConnetion } from './Backend/config/DB.js';
import { setLocals } from './Backend/middleware/local.js';
import methodOverRide from 'method-override';

import session from 'express-session';
import flash from "connect-flash";
import passport from 'passport';
import LocalStrategy from 'passport-local'
import { UserModel } from "./Backend/models/Auth.js"
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import MongoStore from "connect-mongo"
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();


import { upload } from './Backend/controllers/AuthCl.js';

const app = express();
const PORT = 5000;


const store = MongoStore.create({
    mongoUrl: process.env.MONGO_DB_URL,
    crypto: {
        secret: process.env.MY_SECRET
    },
    touchAfter: 24 * 3600
});


store.on("error", () => {
    console.log("Error", )
})

app.use(session({
    secret: process.env.MY_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: { 
        expires: Date.now() + 7 * 24 * 60 * 60* 1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,

     },
}));










app.use(flash());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(methodOverRide('_method'))

app.use(passport.initialize())
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email' }, UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(express.static("Frontend/public"));

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "Frontend", "views"));

app.use('/fa', express.static('./node_modules/@fortawesome/fontawesome-free'));
app.use('/animate', express.static('./node_modules/animate.css'));


// Middleware for variable
app.use(setLocals);

// All Routes Middleware
app.use(UserRoute);









passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://airbnb-clone2-2d1j.onrender.com/auth/google/callback"
    
    }, async(accessToken, refreshToken, profile, done) => {
        try {

            let existingUser = await UserModel.findOne({googleId: profile.id});
            if (existingUser) return done(null, existingUser);

            existingUser = await UserModel.findOne({ email: profile.emails[0].value });
            if(existingUser){
                existingUser.googleId = profile.id;
                await existingUser.save();
                return done(null, existingUser);
            };


            let username = profile.displayName;
    let sameUsername = await UserModel.findOne({ username });
    // let suffix = 1;
    // // while (sameUsername) {
    // //   username = profile.displayName + suffix;  // add number suffix
    // //   sameUsername = await UserModel.findOne({ username });
    // //   suffix++;
    // // }

            const newUser = new UserModel({
                googleId: profile.id,
                username: username,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
                
            });
            
            await newUser.save();
            done(null, newUser);
            
        } catch (error) {
            done(error, null);
        }
    }
))


// Google Login start karega
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
app.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/"  // login ke baad home page par bhej do
  })
);




DBConnetion().then(() => {
    console.log("connection success");
}).catch((err) => {
    console.log("Somthing went wrong to make connection");
})

app.listen(PORT, () => {
    console.log(`Server was running on http://localhost:${PORT}`)
})