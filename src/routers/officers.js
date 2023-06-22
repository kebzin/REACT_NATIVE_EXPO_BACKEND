// const express = require("express");
// const router = express.Router();
// const verifyJWT = require("../middleware/verifyjwt");
// const upload = require("../middleware/imageUpoad");
// // inporting function that will do the operation on the routh from the controller
// const {
//   getOffesers,
//   getSingleOffeser,
//   deleteOffeser,
//   updateOffeser,
// } = require("../controllers/officers");
// const { CreatWanted } = require("../controllers/Wanted");

// router.use(verifyJWT);
// router.get("/officers", getOffesers);
// router.get("/officers/:id", getSingleOffeser);
// router.delete("/deleteOfficers/:id", deleteOffeser);
// router.put("/officers/:id", updateOffeser);
// router.post("/wanted/:id", CreatWanted);
// router.post("/upload", upload.single("selectedFile"), (req, res) => {
//   const file = req.file;
//   console.log(req);
//   res.status(200).json(file.fieldname);
// });

// module.exports = router;
