// const Message = require("../models/Message");
// const offesers = require("../models/officers");

// // creat message function
// const createMessage = async (req, res) => {
//   const content = req.body;
//   const id = req.params.id;
//   const recuver = offesers.findById({ _id: id });
//   if (!recuver) return res.status(404).json({ message: "user not found" });
//   if (recuver?.rol === "Employee")
//     return res.status(403).json({
//       message: "You mus be an Administrator to perform this operation",
//     });
//   const userMessage = await Message.create({
//     officerId: content.SenderID,
//     ReciverID: content.ReciverID,
//     MessageContent: content.MessageContent,
//   });
//   console.log("senderid", content.SenderID, "recipientid", content.RecipientID);
//   console.log("ReciverID", content.ReciverID);
//   console.log("MessageContent", content.MessageContent);
//   res.status(200).json({ message: "Message Sent successfully" });
//   try {
//   } catch (error) {
//     console.log(error.Message);
//   }
// };

// const GetAllMessage = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const officers = await offesers.findById({ _id: id });
//     if (!officers)
//       return res
//         .status(404)
//         .json({ message: "No user Found for this Request" });
//     if (officers.role === "Administrator") {
//       const GetMessage = await Message.find({ officerId: id }).populate(
//         "officerId"
//       );
//       // const Reciver = await offesers.findById({_id: GetMessage. })

//       if (!GetMessage)
//         return res
//           .status(404)
//           .json({ messsage: "No Message Found for This request id" });

//       res.status(200).json(GetMessage);
//     } else {
//       const GetMessage = await Message.find({ ReciverID: id }).populate(
//         "officerId"
//       );
//       if (!GetMessage)
//         return res
//           .status(404)
//           .json({ messsage: "No Message Found for This request id" });

//       res.status(200).json(GetMessage);
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// //  teling the user that the message sent to other user is succesfull and the user have read the data
// const UpdateMessageStatus = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const ChangeMessageStatus = await Message.findByIdAndUpdate(
//       { _id: id },
//       { view: true },
//       { new: true }
//     ).exec();
//   } catch (error) {}
// };

// module.exports = { createMessage, GetAllMessage };
