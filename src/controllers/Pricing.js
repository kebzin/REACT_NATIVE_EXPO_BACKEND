// const Pricing = require("../models/pricing");
// const offesers = require("../models/officers");
// const { restart } = require("nodemon");

// // adding price function
// const AddPricing = async (req, res) => {
//   const content = req.body;
//   const id = req.params.id;
//   const User = await offesers.findById(content.officerId);
//   try {
//     if (!User) {
//       return res.status(404).json({ mesage: "user not found" });
//     }
//     if (User.status === "Employee" || User.status === "pending") {
//       return res.status(404).json({
//         mesage: "your must be an adminstrator to perform this operation",
//       });
//     }

//     const pricing = await Pricing.create({
//       OffenceName: content.OffenceName,
//       OffencePrice: content.OffencePrice,
//       OffenceCategory: content.OffenceCategory,
//       AdminID: content.officerId,
//     });
//     return res
//       .status(200)
//       .json({ mesaage: "succesfully added", pricing: pricing });
//   } catch (error) {}
// };

// //  get all the prices
// const getAllPrices = async (req, res) => {
//   try {
//     const prices = await Pricing.find();
//     res.json(prices);
//   } catch (error) {
//     console.error(error);
//   }
// };

// // delete price funcion
// const deletePrice = async (req, res) => {
//   const content = req.body;
//   const id = req.params.id;
//   try {
//     console.log(req.body.AdminID);
//     console.log(id);

//     // const Authorizeperson = await offesers
//     //   .findById({ _id: content.AdminID })
//     //   .exec();
//     // if (!Authorizeperson)
//     //   return res.status(404).json({ message: "user not found" });
//     // if (Authorizeperson.status === "Administrator")
//     //   return res.status(404).json({ message: "You  are not an authorized " });

//     const DeletePrice = await Pricing.findByIdAndDelete({ _id: id });
//     res.status(200).json({ DeletePrice });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(404).json(error.message);
//   }
// };

// // update price
// const updatePrice = async (req, res) => {
//   const content = req.body;
//   const id = req.params.id;
//   const Authorizeperson = await offesers
//     .findById({ _id: content.AdminID })
//     .exec();
//   if (!Authorizeperson)
//     return res.status(404).json({ message: "user not found" });
//   // if (Authorizeperson.status === "Administrator")
//   //   return res.status(404).json({ message: "You  are not an authorized " });

//   const UpdateItem = await Pricing.findByIdAndUpdate(
//     { _id: id },
//     { ...content },
//     {
//       new: true,
//     }
//   ).exec();
//   if (!UpdateItem)
//     return res
//       .status(404)
//       .json({ message: "The item you requested was not found." });

//   res.status(200).json({ UpdateItem });

//   try {
//   } catch (error) {}
// };

// module.exports = {
//   AddPricing,
//   getAllPrices,
//   deletePrice,
//   updatePrice,
// };
