import { Favs } from "../models/FavSchema.js";
import { HostModel } from "../models/Host.js";
import { Data } from "../models/InItSchema.js";
import { ReviewsModel } from "../models/ReviewSchema.js";
import { AllListings } from "../models/Schema.js";







export const ReViews = async (req, res) => {
  const { id } =  req.params;
  const { ratings, comment } = req.body;
  console.log(ratings, comment)
  const review = await new ReviewsModel({
    comment,
    ratings,
    owneruser : req.user
  })
  review.save();

   const data = await Data.findByIdAndUpdate(id, 
    { $push: { reviews: review._id } }, 
    { new: true })

  // if(!data){
  //   console.log("Documnet not found");
  //   return res.redirect("/");
  // }
  if(data){
    await HostModel.findByIdAndUpdate(data.owner, { $push: { reviews: review._id } });
    await Favs.findOneAndUpdate({originalId: data._id}, { $push: { reviews: review._id } })
    
    console.log(data.owner);
  }

  const data2 = await HostModel.findByIdAndUpdate(id, 
    { $push: { reviews: review._id } }, 
    {new: true});
  if(data2){
    await Data.findOneAndUpdate({owner: data2._id}, 
    { $push: { reviews: review._id } });

    const FinD = await Data.findOne({owner: data2._id});
    if(FinD){
      await Favs.findOneAndUpdate({originalId: FinD._id}, { $push: { reviews: review._id } })
    }

  }


  const dataD = await Favs.findByIdAndUpdate(id, 
    { $push: { reviews: review._id } }, 
    { new: true })

  // if(!data){
  //   console.log("Documnet not found");
  //   return res.redirect("/");
  // }

  if(dataD){
    await AllListings.findByIdAndUpdate(dataD.originalId, { $push: { reviews: review._id } })
    await Data.findByIdAndUpdate(dataD.originalId, { $push: { reviews: review._id } })
    
    const FindData = await Data.findOne(dataD.originalId);
    if(FindData){
      await HostModel.findOneAndUpdate(
        FindData.owner,
        { $push: { reviews: review._id } }
      )
    }
  }

  const dataF = await AllListings.findByIdAndUpdate(id, 
    { $push: { reviews: review._id } }, 
    {new: true});
  if(dataF){
    await Favs.findOneAndUpdate({originalId: dataF._id}, { $push: { reviews: review._id } })
  }
  res.redirect(`/view/${id}`)
}


export const ReviewDel = async (req, res) => {
  const { viewid, id } = req.params;


  const RevDel = await ReviewsModel.findByIdAndDelete(id);
  await Promise.all([
      HostModel.updateMany({reviews: id}, {$pull: {reviews: id} }),
      AllListings.updateMany({reviews: id}, {$pull: {reviews: id} }),
      Data.updateMany({reviews: id}, {$pull: {reviews: id} })
  ])

  res.redirect(`/view/${viewid}`);

}