require("dotenv").config();
// const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const User = require("../models/user");
const Order = require("../models/order");
const { Cashfree } = require('cashfree-pg')




const createOrder = async (req, res) => {
  const { amount, customer_name, customer_id, customer_phone, customer_email } = req.body
  try {
    Cashfree.XClientId = process.env.CASHFREE_KEY_ID;
    Cashfree.XClientSecret = process.env.CASHFREE_KEY_SECRET;
    Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
    // var request = {
    //   "order_amount": amount,
    //   "order_currency": "INR",
    //   "customer_details": {
    //     "customer_id": customer_name,
    //     "customer_name": customer_name,
    //     "customer_email": customer_email,
    //     "customer_phone": customer_phone,
    //     "customer_country": "IN",
    //   },
    //   "order_meta": {
    //     "return_url": "https://test.cashfree.com/pgappsdemos/return.php?order_id=order_123"
    //   },
    //   "order_note": ""
    // }
    var request = {
      "order_amount": amount,
      "order_currency": "INR",
      "customer_details": {
        "customer_id": "node_sdk_test",
        "customer_name": "test user",
        "customer_email": "example@gmail.com",
        "customer_phone": "9312341234",
        "customer_country": "IN",
      },
      "order_meta": {
        "return_url": "https://test.cashfree.com/pgappsdemos/return.php?order_id=order_123"
      },
      "order_note": ""
    }
    

    const response = await Cashfree.PGCreateOrder('2023-08-01', request);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error creating order:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create order' });
  }
}
const verifyPayment = async (req, res) => {
  let version = "2023-08-01"
  Cashfree.PGFetchOrder(version, "<order_id>").then((response) => {
    console.log('Order fetched successfully:', response.data);
  }).catch((error) => {
    console.error('Error:', error.response.data.message);
  });
}




// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID ,
//   key_secret: process.env.RAZORPAY_KEY_SECRET ,
// });

// console.log(process.env.RAZORPAY_KEY_ID, "key_id");


// const createOrder = async (req, res) => {
//   const { amount } = req.body;
//   console.log(amount, "amount");
//   const amountInPaise = amount * 100;
//   const options = {
//     amount: amountInPaise, // amount in the smallest currency unit
//     currency: "INR",
//     receipt: `receipt_${Math.random().toString(36).substring(7)}`,
//   };

//   // Create an order in razorpay

//   try {
//     const order = await razorpay.orders.create(options);
//     console.log(order)
//     res.status(200).json(order);
//   } catch (error) {
//     console.log(error, "error");
//     res.status(500).json({ error: error.message });
//   }
// };

// // Payment verification endpoint
// const verifyPayment = async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     membership,
//     userId,
//   } = req.body;
//   if (
//     !mongoose.Types.ObjectId.isValid(userId) ||
//     !mongoose.Types.ObjectId.isValid(membership)
//   ) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Invalid userId or membership" });
//   }

//   try {
//     // Create order record in database
//     const newOrder = await Order.create({
//       membership: mongoose.Types.ObjectId(membership),
//       userId: mongoose.Types.ObjectId(userId),
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id,
//       signature: razorpay_signature,
//     });

//     // Update user membership and order history
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         membership: mongoose.Types.ObjectId(membership),
//         isPaid: true,
//         $push: { orders: newOrder._id },
//       },
//       { new: true }
//     ); // Ensure to get the updated document back

//     if (!updatedUser) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }
//     console.log("updatedUser", updatedUser);
//     return res.status(200).json({ success: true, newOrder });
//   } catch (error) {
//     console.error("Error updating user membership:", error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// };

module.exports = { createOrder, verifyPayment };