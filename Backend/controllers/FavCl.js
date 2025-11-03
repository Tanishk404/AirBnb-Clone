import { Favs } from "../models/FavSchema.js";
import { Data } from "../models/InItSchema.js";
import { AllListings } from "../models/Schema.js";








export const favoRiate = async (req, res) => {
  const { id } = req.params; 
  try {
    const existingFav = await Favs.findOne({ originalId: id });
    if (existingFav) {
      await Favs.deleteOne({ originalId: id });
      let user = req.user;
      return res.json({ action: "removed", user});
      
    }
    let listing = await Data.findById(id);
    if (!listing) {
      listing = await AllListings.findById(id);
    }

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    const obj = listing.toObject();
    obj.originalId = listing._id; 

   
    delete obj._id; 
    

    await Favs.create({
      originalId: listing._id,
      userfav: req.user._id
    });
    return res.json({ action: "added" });
        
  } catch (err) {
    console.log("Error in favoRiate toggle:", err);
    res.status(500).send("Server error");
  }
};




export const AllFav = async (req, res) => {

    let dataFavs = await Favs.find({}).populate({ path: "originalId", model: "Data" });
    
    let allListingFavs = await Favs.find({}).populate({ path: "originalId", model: "AllListing" });
    let result = [...dataFavs.filter(d => d.originalId), ...allListingFavs.filter(d => d.originalId)];
    const fag =  await Favs.find();
    const fav = fag.map(f => f.originalId.toString());
    console.log(fav);
    result = result.filter((n) => n.userfav.toString() === req.user._id.toString());

    console.log(result)
    res.render("fav.ejs", { result, fav, PageType: "Fav" });
}
