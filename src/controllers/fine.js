// const Fines = require("../models/fine");
// const Drivers = require("../models/drivers");
// const officers = require("../models/officers");
// const transaction = require("../models/transaction");
// const dotenv = require("dotenv");

// // cerating officer fine function
// const Fine = async (request, response, next) => {
//   const content = request.body;
//   const id = request.params.id;

//   console.log(content.officerId);

//   try {
//     const officersID = await officers.findById({ _id: id });
//     if (!officersID) {
//       return response.status(401).json({
//         message: "user not found",
//       });
//     }
//     // calculating the percentage
//     const percentage = content.percentage;
//     const number = content.fineAmount;
//     const decimal = percentage / 100;
//     const bonuse = decimal * number;

//     // making fine
//     const Fine = await Fines.create({
//       officerId: id,
//       ...content,
//       bonus: bonuse,
//     });
//     console.log("content", content);
//     // await Fine.save();
//     // const drivers = await Drivers.create({
//     //   FineID: (content.FineID = Fine._id),
//     //   ...content,
//     // });
//     const Trnsaction = await transaction.create({
//       officerId: id,
//       fineId: (content.fineId = Fine._id),
//       ...content,
//     });

//     officersID.fines = officersID.fines.concat(Fine._id);
//     officersID.transactions = officersID.transactions.concat(Trnsaction._id);
//     officersID.save();

//     return response
//       .status(200)
//       .json({ messsage: Fine, transactions: Trnsaction });
//   } catch (error) {
//     console.log(error);
//     return response.status(500).json({
//       message: error.message,
//     });
//   }
// };

// // get all the fines
// const getAllFne = async (req, res) => {
//   const content = await req.body;
//   const id = req.params.id;

//   const AllFine = await Fines.find().populate("officerId");
//   if (AllFine.length === 0)
//     return res.status(404).json({ message: "No fine avelable " });
//   res.status(200).json(AllFine);
// };

// const getAllFineMyFine = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const fine = await Fines.find({ officerId: id }).populate("officerId");
//     if (!fine) res.status(404).json({ message: "No fine found" });
//     return res.status(200).json(fine);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const DeletingFine = async (req, res) => {
//   const id = req.params.id;
//   const content = req.body;
//   console.log(id);
//   console.log("content", content);
//   try {
//     const fine = await Fines.findByIdAndDelete({ _id: id });
//     if (!fine)
//       return res.status(404).json({
//         message: "Didn't delete , because there was no matching found",
//       });

//     const OFFICERS = await officers.findById({ _id: content.officerId });
//     console.log("offier", OFFICERS);
//     const fineIndex = OFFICERS.fines.findIndex((fine) => fine._id === id);
//     console.log("fineindex", fineIndex);
//     if (fineIndex !== -1) {
//       OFFICERS.fines.splice(fineIndex, 1);

//       await OFFICERS.save();
//     }

//     res.status(200).json({ message: " Deleted successfully" });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// //  get a single fine
// const GetSingleFine = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const fine = await Fines.findById({ _id: id }).populate("officerId");
//     if (!fine)
//       return res.status(404).json({
//         message:
//           "The request Id you passed in is not fount, This is usually because you the Id number yo are comming with is invalid. Pleade check the Id number correctly and try again",
//       });
//     return res.status(200).json(fine);
//   } catch (err) {
//     console.log(err);
//   }
// };
// // update  fine
// const updateFine = async (req, res) => {
//   const id = req.params.id;
//   const content = req.body;
//   try {
//     const UpdateItem = await Fines.findById({ _id: id }).exec();
//     if (!UpdateItem)
//       return res.status(404).json({ message: "No Match found for id " + id });
//     const UpdatePrice = await Fines.findByIdAndUpdate(
//       { _id: id },
//       {
//         ...content,
//       },
//       { new: true }
//     );

//     // if (
//     //   UpdatePrice.amountPaid === UpdatePrice.fineAmount.replace(/[^\d.-]/g, "")
//     // ) {
//     //   Fines.findByIdAndUpdate(
//     //     { _id: id },
//     //     { status: "CompleteD" },
//     //     { new: true }
//     //   );
//     // }
//     res.status(200).json({ message: "Payment Have been Made successfully" });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = {
//   Fine,
//   getAllFne,
//   getAllFineMyFine,
//   DeletingFine,
//   GetSingleFine,
//   updateFine,
// };
