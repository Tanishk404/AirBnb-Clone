import session from "express-session";

export const isLoggedIn = (req, res, next) =>{
  if(!req.isAuthenticated()){
    req.session.redirectURL = req.originalUrl;   
    req.flash("userlogin", "User must be login") 
    return res.redirect("/login")
  }
  next();
}


export const SaveRedirectUrl = (req, res, next) => {
  if(req.session.redirectURL){
      res.locals.redirectURL = req.session.redirectURL;

      console.log(req)
  }
  next();
}

