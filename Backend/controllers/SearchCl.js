import { Favs } from "../models/FavSchema.js";
import { Data } from "../models/InItSchema.js";
import { AllListings } from "../models/Schema.js";





// Search Destination in Input
export const DestinationRoute = async (req, res) => {
  try {
    const q = req.query.q || "";
    let result = [];

    if (q) {
      const dataResults = await Data.find({ location: { $regex: q, $options: "i" } });
      const allListingsResults = await AllListings.find({ location: { $regex: q, $options: "i" } });

      result = [...dataResults, ...allListingsResults];

      const seen = new Set();
      result = result.filter(item => {
        const id = item._id.toString();
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });
    }


    const favCheck = await Favs.find();
  

    // Agar results nahi mile to flag set karo
    const noResults = result.length === 0;
    
    res.render("SearchResult", { result, noResults, fav: favCheck });
  } catch (err) {
    console.log("Error in search", err);
    res.status(500).send("Server Error");
  }
};
