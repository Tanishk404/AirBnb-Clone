import { Favs } from "../models/FavSchema.js";
import { AllListings } from "../models/Schema.js";




// Fetching data from Database Collection for home page
export const GetHome = (req, res) => {
  const userId = req.user ? req.user._id : null;
  req.flash("Whistlist", "User must be login to create wishlist")
  Promise.all([
    AllListings.find({}),
    Favs.find({userfav: userId}).select("originalId") 
  ]).then(([listings, favs]) => {
      const favIds = favs.map(f => f.originalId._id.toString());
   
      const logoutMsg = req.flash("logout");
      const WishMsg = req.flash("Whistlist");
      console.log(logoutMsg);

      res.render("Home", { result: listings, favIds, PageType: "home", logoutMsg, WishMsg });

     
    })
    .catch((err) => {
      console.log("Somthing went wrong", err.message);
    });
};