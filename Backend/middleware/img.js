import { upload } from "../controllers/AuthCl.js";

export const Image_d = [ 
    upload.single('image'),
    (req, res, next) => {
    console.log(req.file);
    next()
}
];