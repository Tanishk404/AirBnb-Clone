import { UserModel } from "../models/Auth.js";

import passport from "passport";
import multer from "multer";
import { storage } from "../../cloudinary.js";




export const upload = multer({storage: storage})




export const SignUpRoute = (req, res) =>{
  res.locals.PageType = "signup"
  res.locals.Error = req.flash("error");
  res.locals.existFlash = req.flash("exist");

  res.render("signUp")
}


export const SignUp = async (req, res, next) =>{
  const {username, email, password} = req.body;
  const displayName = (username && username.trim()) ? username.trim() : email;
  const avatarUrl =  `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&length=1&background=000000&color=ffffff&size=256&rounded=true`;

  const exist = await UserModel.findOne({email})

  if(exist){
    req.flash("exist", "this email or password already registered please try diffrent email");
    return res.redirect("/signup");
    
  }else{
    const user = await new UserModel({
      username,
      email,
      avatar: avatarUrl
    })
    const userdata =  await UserModel.register(user, password);
  
    req.login(userdata, (err) =>{
      if(err) {return next(err)};
      res.redirect("/");
    });
}} 


export const LoginRoute = (req, res) =>{
  res.locals.PageType = "login"
  const fail = req.flash("error");
  const userlogin = req.flash("userlogin");
  console.log(fail);
  res.render("login", {fail, userlogin})
}



export const LogOut = (req, res, next) =>{
  res.clearCookie('connect.sid');
  req.logout((err) => {
    if(err) {return next(err) }
    req.flash("logout", "now you are logged out");
    res.redirect("/");
    return next(err);
  })
}