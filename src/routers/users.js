const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyjwt");
const upload = require("../middleware/imageUpoad");
// inporting function that will do the operation on the routh from the controller
const { deleteUser } = require("../controllers/users");

router.use(verifyJWT);
router.delete("/deleteOfficers/:id", deleteUser);
// router.put("/officers/:id", updateOffeser);
// router.post("/wanted/:id", CreatWanted);
// router.post("/upload", upload.single("selectedFile"), (req, res) => {
//   const file = req.file;
//   console.log(req);
//   res.status(200).json(file.fieldname);
// });

module.exports = router;
