// const drivers = require("../models/drivers");
// const user = require("../models/officers");

// // create drivers
// const AddDrivers = async (req, res) => {
//   const content = req.body;
//   const id = req.params.id;

//   try {
//     const Users = await user.findById({ _id: content.userID }).exec();
//     if (!Users) return res.status(404).json({ message: "User not found" });
//     if (Users.status == !"Administrator")
//       return res.status(401).json({ message: "You are not an Administrator" });
//     const Drivers = await drivers.create({ ...content });
//     res.status(200).json({ Drivers });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };

// //  get all drivers
// const getAllDrivers = async (req, res) => {
//   const content = req.body;
//   try {
//     // check who is featcing the data
//     // const User = await user.findById({ _id: content.userID });
//     // if (!User) return res.status(404).json({ message: " user not found" });

//     const Drivers = await drivers.find();
//     res.status(200).json(Drivers);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ errors: error.message });
//   }
// };

// module.exports = { AddDrivers, getAllDrivers };
