import { Router } from "express";

import passport from "passport";
import { isLoggedIn, SaveRedirectUrl } from "../middleware/Login.js";
import { Image_d } from "../middleware/img.js";
import { GetHome } from "../controllers/HomeCl.js";
import { AllListing } from "../controllers/ListingCl.js";
import { ViewDetailed } from "../controllers/ShowCl.js";
import { DestinationRoute } from "../controllers/SearchCl.js";
import { AllFav, favoRiate } from "../controllers/FavCl.js";
import { AddHost, DeleteRoute, Editform, EditFormData, HostedHome } from "../controllers/HostCl.js";
import { MobileDashPage, UserHosted } from "../controllers/UserCl.js";
import { ReviewDel, ReViews } from "../controllers/ReviewCl.js";
import { LoginRoute, LogOut, SignUp, SignUpRoute } from "../controllers/AuthCl.js";




export const UserRoute = Router();


UserRoute.get("/", GetHome);
UserRoute.get("/listings", AllListing);

UserRoute.post("/favorites/:id", isLoggedIn, favoRiate);
UserRoute.get("/favorites",isLoggedIn, AllFav);

UserRoute.get("/view/:id", ViewDetailed);

UserRoute.get("/searched", DestinationRoute);


UserRoute.get("/host", isLoggedIn, HostedHome);
UserRoute.post("/host",isLoggedIn, Image_d, AddHost); 
UserRoute.get("/host/user", UserHosted); 

UserRoute.get("/edit/:id",isLoggedIn, Editform);
UserRoute.put("/listings/edit/:id",isLoggedIn,Image_d, EditFormData);

UserRoute.delete("/del/:id",isLoggedIn, DeleteRoute);



UserRoute.post("/listings/review/:id", ReViews);
UserRoute.delete("/view/:viewid/review/del/:id",isLoggedIn, ReviewDel);

UserRoute.get("/login", LoginRoute);
UserRoute.get("/signup", SignUpRoute);
UserRoute.post("/signup", SignUp);

UserRoute.get("/logout", LogOut);

UserRoute.post("/login",
  SaveRedirectUrl, 
passport.authenticate("local", {
    failureRedirect: "/login", 
    failureFlash: "Invalid username or password!"
}), 
async (req, res) => {
  req.flash("loginS", "Welcome to airbnb app");
  res.redirect(res.locals.redirectURL || "/")
});

UserRoute.get("/users/profile", MobileDashPage);

