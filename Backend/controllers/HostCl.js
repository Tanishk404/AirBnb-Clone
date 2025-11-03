import { HostModel } from "../models/Host.js";
import { Data } from "../models/InItSchema.js";
import { AllListings } from "../models/Schema.js";

import { ValiDateHostForm } from "../models/Host.js";



// HostForm.ejs rendering for form 
export const HostedHome = (req, res) => {
  res.locals.PageType = "host";

  res.render("HostForm.ejs");
  
};


export const AddHost = async (req, res) => {
  const {title, description,  image, price, location, country} = req.body;

  const facilities = req.body.facilities || {};

  const {error} = ValiDateHostForm(req.body);
  if(error){
    return res.status(400).send(error.details[0].message);
  }


       const parsedFacilities = {
      kitchen: facilities.kitchen === "true",
      wifi: facilities.wifi === "true",
      tv: facilities.tv === "true",
      lift: facilities.lift === "true",
      pool: facilities.pool === "true",
      parking: facilities.parking === "true",
      Ac: facilities.Ac === "true",
      balcony: facilities.balcony === "true",
      gym: facilities.gym === "true",
      hairDryer: facilities.hairDryer === "true",
      cleaningProduct: facilities.cleaningProduct === "true",
      conditioner: facilities.conditioner === "true",
      bodySoap: facilities.bodySoap === "true",
      outdoorShower: facilities.outdoorShower === "true",
      hotWater: facilities.hotWater === "true",
      showerGel: facilities.showerGel === "true",
    };


   const clData = new HostModel({
      title,
      description,
      image: {
        filename: title,
        url: req.file.path
      },
      price,
      location,
      owneruser: req.user,
      country,
      facilities: parsedFacilities
   })

   await clData.save();

   const Al = new Data({
      title,
      description,
      image: {
        filename: title,
        url: req.file.path
      },
      price,
      location,
      country,
      owner: clData._id,
      facilities: parsedFacilities,
      owneruser: req.user,
      isHosted: true,
   })
   
   await Al.save();
  
   req.flash("success", "New listing created successfully")

   res.redirect("/host/user")

};



// Listings data from Edit Form
export const Editform = async (req, res) => {
  const { id } = req.params
  res.locals.PageType = "edit"
  
  Promise.all([
    await HostModel.findById(id),
    await Data.findById(id),
    await AllListings.findById(id),
  ]).then((result) => {
    const Rl = result.filter((data) => data !== null)
    res.render("EditForm", {result: Rl});
  }).catch((err) => {
    console.lof("Somthing went wrong in form edit", err);
  })
}



// Edit Listings
export const EditFormData = async (req, res) => {
  const { id } = req.params;
    try {

       const facilities = req.body.facilities || {}; 
    const parsedFacilities = {
      kitchen: facilities.kitchen === "true" || facilities.kitchen === true,
      wifi: facilities.wifi === "true" || facilities.wifi === true,
      tv: facilities.tv === "true" || facilities.tv === true,
      lift: facilities.lift === "true" || facilities.lift === true,
      pool: facilities.pool === "true" || facilities.pool === true,
      parking: facilities.parking === "true" || facilities.parking === true,
      Ac: facilities.Ac === "true" || facilities.Ac === true,
      balcony: facilities.balcony === "true" || facilities.balcony === true,
      gym: facilities.gym === "true" || facilities.gym === true,
      hairDryer: facilities.hairDryer === "true" || facilities.hairDryer === true,
      cleaningProduct: facilities.cleaningProduct === "true" || facilities.cleaningProduct === true,
      conditioner: facilities.conditioner === "true" || facilities.conditioner === true,
      bodySoap: facilities.bodySoap === "true" || facilities.bodySoap === true,
      outdoorShower: facilities.outdoorShower === "true" || facilities.outdoorShower === true,
      hotWater: facilities.hotWater === "true" || facilities.hotWater === true,
      showerGel: facilities.showerGel === "true" || facilities.showerGel === true,
    };


        const {title, description, price, country, location} = req.body;

        const UpdateData = {title, description, price, country, location, facilities: parsedFacilities}

        if(req.file){
          UpdateData.image = {
            url: req.file.path,
          };
        }
        const Home = await AllListings.findById(id);
        if(Home){
          await AllListings.findOneAndUpdate( Home, {$set: UpdateData
          })
        }

        const HostCheck = await HostModel.findById(id)
        if(HostCheck){
          console.log(HostCheck);
          await HostModel.findByIdAndUpdate(HostCheck, {$set: UpdateData})
          await Data.findOneAndUpdate({owner: HostCheck._id}, {$set: UpdateData})
        }
        const DataCheck = await Data.findById(id).select("owner");
        if(DataCheck){
          console.log(DataCheck.owner);
          await Data.findOneAndUpdate({owner: DataCheck.owner}, {$set: UpdateData})

          await HostModel.findByIdAndUpdate({_id: DataCheck.owner}, {$set: UpdateData})
        }
        req.flash("edit_success", "edit saved successfully");

        res.redirect(`/view/${id}`);
    } catch (err) {
      console.log(err.message);
      console.log(err);
      res.status(500).send("Server error");
    }
} 




// Delete Listings

export const DeleteRoute = async (req, res) =>{
  const {id} = req.params;
  try {
    const data1 = await HostModel.findById(id);
    req.flash("Delsuccess", "Listing deleted successfully")
    if(data1){
      await HostModel.findOneAndDelete(id);
      await Data.findOneAndDelete({owner : data1._id});
      
      
      return res.redirect("/listings");
    }
    const data2 = await Data.findById(id).select("owner")
    
    
    const own = await Data.findOne({owner: data2.owner})

    if(data2){
      
      const d = await Data.findOneAndDelete({owner: data2.owner});
      req.flash("success", "Listing deleted successfully!");
      await HostModel.findOneAndDelete(data2.owner);
      
      res.redirect("/listings");
    }
  } catch (err) {
        console.log(err);
    res.status(500).send("Server error");
  }
  

}
