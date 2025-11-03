import { UserModel } from "../models/Auth.js";
import { HostModel } from "../models/Host.js";



// Saved host collection data rendering 
export const UserHosted = async (req, res) => {
  const HostEdD = await HostModel.find({owneruser: req.user}).populate("owneruser");
  const success = req.flash("success")
  const UserOwn = await UserModel.find({})

  res.render("HostHome", {result: HostEdD, success});

}





// User profile page rendering
export const MobileDashPage = async (req, res) => {
  const currentUser = req.user
  console.log(currentUser)
  const data = await UserModel.find(currentUser)
  res.render("DashBoard.ejs", { PageType: "profile", data });
};