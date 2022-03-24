const ErrorHandler = require("../util/errorHandler");
const multer = require("multer");
const path = require("path");
// // const storage = multer.diskStorage({
// //     destination:(req,file,cd)=>{
// //         cd(null,UPLOADS_FILE)
// //     },
// //     filename:(req,file,cd)=>{
// //         const fileExt = path.extname(file.originalname)
// //         const fileName = file.originalname
// //                         .replace(fileExt,"")
// //                         .toLowerCase()
// //                         .split(" ")
// //                         .join("-") + "-" + Date.now()
// //         cd(null,fileName + fileExt)
// //     }
// // })

// const upload = multer({
//   // storage:storage,
//   // dest:storage,
//   //   limits: {
//   //     fileSize: 1000000, //1MB file
//   //   },
//   fileFilter: (req, file, cd) => {
//     // console.log("this is multer body = ", req.body);
//     console.log("this is multer fil = ", file);
//     // Object.keys(file).length === 0
//     // if (file === undefined) {
//     //   new Error("Please provide your profile image..!");
//     // }
//     if (
//       file.mimetype === "image/jpeg" ||
//       file.mimetype === "image/jpg" ||
//       file.mimetype === "image/png"
//     ) {
//       cd(null, true);
//     } else {
//       cd(new Error("Only uploaded jpeg,png or jpg...!"));
//     }
//   },
// });
// module.exports = upload;

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
module.exports = upload;
