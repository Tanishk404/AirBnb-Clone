import { Favs } from "../models/FavSchema.js";
import { HostModel } from "../models/Host.js";
import { Data } from "../models/InItSchema.js";
import { AllListings } from "../models/Schema.js";


import mbxClient from "@mapbox/mapbox-sdk"


import GeoCodingService from "@mapbox/mapbox-sdk/services/geocoding.js";
import { sampleListings } from "../init/data.js";



// View Detailed Data according diffrent ids from all listings page
export const ViewDetailed = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  
  Promise.all([
    Data.findById(id).populate({path: "reviews",
      populate :{
        path: "owneruser"
      }
    }).populate("owneruser"),
    AllListings.findById(id).populate({path: "reviews",
      populate :{
        path: "owneruser"
      }
    }).populate("owneruser"),
    Favs.findById(id).populate({path: "reviews",
      populate :{
        path: "owneruser"
      }
    }).populate("owneruser"),
    HostModel.findById(id).populate({path: "reviews",
      populate :{
        path: "owneruser"
      }
    }).populate("owneruser")
  ]).then((result) => {
      const d = result.filter((d) => d !== null);

      const success = req.flash("edit_success")

      const BaseClient = new mbxClient({accessToken: process.env.Map_Token})
        let previousPath = "/";
        try {
          const previousUrl = req.get("Referer");
          if(previousUrl){
            const pathname = new URL(previousUrl);
            previousPath = pathname.pathname;
          }
        } catch (error) {
          console.log("Previous URL error", error.message);
        }

       res.locals.PreviousUrl = previousPath;

      const geocodingService = new GeoCodingService(BaseClient);

      const k = result.find(m => m !== null);
      const q = `${k.location} ${k.country}`

      geocodingService.forwardGeocode({
            query: q,
            limit: 1
      })
      .send()
      .then(
          (response) => {
            if(response){
              const coordinate = response.body.features[0]?.geometry?.coordinates || [-86.49609,
                34.316809,];
       
                k.coordinates.coordinate = coordinate;
                k.save();
            }

            res.render("Detailed", { result: d, PageType: "detail", success, MapToken: process.env.Map_Token, coordinates: k.coordinates.coordinate, });
        }
      )
    
  }).catch((err) => {
    console.log("Somthing went wrong in Detailed View", err.message);
  })
};
