import { Favs } from "../models/FavSchema.js";
import { Data } from "../models/InItSchema.js";



// Fetching data from same Database  diffrent Collection for all listings page
export const AllListing = (req, res) => {
const userId = req.user ? req.user._id : null;
    Promise.all([

      Data.find({}).populate("owner").populate("owneruser"),
      Favs.find({userfav: userId}).select("originalId")
    ]).then(([result, favs]) => {
      const fav = favs.map(f => f.originalId._id.toString());
      const msg = req.flash("Delsuccess")
      const lgn = req.flash("loginS")
      console.log(lgn);
      res.render("Listing", { result: result, fav, msg, lgn});

    })
    .catch((err) => {
      console.log("Somthing went wrong", err.message);
    });
};

