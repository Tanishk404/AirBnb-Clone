import { UserModel } from "../models/Auth.js";





export const setLocals = (req, res, next) => {
  res.locals.obj = null;
  res.locals.PageType = null;
  res.locals.PageTypeFor = "host";
  res.locals.user = req.user;
  res.locals.url = req.url

  

  next();
};









  


