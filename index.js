// const express=require('express')
// const app=express()
// require('dotenv').config()

// app.use(express.urlencoded({extended:true}))
// app.use(express.json())
// const cors=require('cors');
// app.use(cors())
// app.use(express.static('upload'))
// //user router
// const userrouter=require('./router/userRouter')
// app.use("/user",userrouter)
// const tokenVerification=require('./utils/tokenverification')

// // //task router
// // const taskrouter=require('./router/taskRouter')
// // app.use('/task',tokenVerification,taskrouter)


// // admin
// // const adminrouter=require('./router/adminRouter')
// // app.use('/admin',adminrouter)




// app.listen(process.env.PORT,()=>{
//     console.log("server running http://localhost:9000")
// })

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// require('dotenv').config();
// const Razorpay = require('razorpay');
// const cors = require('cors');
// const Payment = require('./model/PaymentModel'); // Import the Payment model
// const tokenVerification = require('./utils/tokenverification'); // Assuming token verification is used
// const crypto = require('crypto');

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());
// app.use(express.static('upload'));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Razorpay setup
// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID, // Store your Razorpay Key ID in .env
//     key_secret: process.env.RAZORPAY_KEY_SECRET // Store Razorpay Secret in .env
// });

// // Routes
// // User router
// const userrouter = require('./router/userRouter');
// app.use("/user", userrouter);

// // Razorpay order creation endpoint
// app.post('/create-order', async (req, res) => {
//     const { amount, currency, receipt, plan_description } = req.body;

//     const options = {
//         amount: amount, // Amount in paise already, received from frontend (React)
//         currency,
//         receipt, // Unique receipt identifier for the order
//     };

//     try {
//         // Create Razorpay order
//         const order = await razorpay.orders.create(options);

//         // Save initial payment details to MongoDB
//         const newPayment = new Payment({
//             payment_id: '', // Will be populated after successful payment
//             order_id: order.id,
//             amount: amount / 100, // Store in rupees
//             currency: currency,
//             plan_description: plan_description,
//             payment_status: 'Pending',
//         });

//         await newPayment.save(); // Save payment record

//         res.json({
//             id: order.id, // Order ID created by Razorpay
//             currency: order.currency,
//             amount: order.amount,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Razorpay subscription creation endpoint

// app.post('/create-subscription', async (req, res) => {
//     try {
//         const { amount, currency, plan_description, plan_id } = req.body;

//         // Validate input
//         if (!amount || !currency || !plan_description || !plan_id) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         // Create subscription (example logic)
//         const newSubscription = new Payment({
//             amount,
//             currency,
//             description: plan_description,
//             planId: plan_id,
//         });

//         await newSubscription.save();
//         res.status(200).json({ subscription_id: newSubscription._id });
//     } catch (error) {
//         console.error('Error creating subscription:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Payment verification endpoint
// app.post('/verify-payment', async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     // Generate a signature for verification
//     const generated_signature = crypto
//         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//         .update(razorpay_order_id + "|" + razorpay_payment_id)
//         .digest('hex');

//     if (generated_signature === razorpay_signature) {
//         try {
//             // Update payment status and store payment_id in MongoDB
//             await Payment.findOneAndUpdate(
//                 { order_id: razorpay_order_id },
//                 { payment_id: razorpay_payment_id, payment_status: 'Successful' }
//             );

//             res.json({ success: true, message: 'Payment verified successfully' });
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     } else {
//         res.status(400).json({ success: false, message: 'Payment verification failed' });
//     }
// });

// // Start the server
// const PORT = process.env.PORT || 5000; // Set default port to 5000 if not specified
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });



// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// require('dotenv').config();
// const Razorpay = require('razorpay');
// const cors = require('cors');
// const Payment = require('./model/PaymentModel'); // Import the Payment model
// const crypto = require('crypto');

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Razorpay setup
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID, // Store your Razorpay Key ID in .env
//   key_secret: process.env.RAZORPAY_KEY_SECRET // Store Razorpay Secret in .env
// });

// // Razorpay subscription creation endpoint
// // Server code
// app.post('/create-subscription', async (req, res) => {
//     try {
//       const { plan_id, plan_description } = req.body;
  
//       if (!plan_id || !plan_description) {
//         return res.status(400).json({ error: 'Missing required fields' });
//       }
  
//       const subscriptionOptions = {
//         plan_id: plan_id,
//         customer_notify: 1,
//         total_count: 12,
//       };
  
//       const subscription = await razorpay.subscriptions.create(subscriptionOptions);
  
//       // Debug output to check subscription details
//       console.log('Subscription:', subscription);
  
//       const amount = subscription.total_amount / 100;
//       if (isNaN(amount)) {
//         throw new Error('Invalid amount calculated');
//       }
  
//       const newSubscription = new Payment({
//         subscription_id: subscription.id,
//         plan_id: plan_id,
//         amount: amount,
//         currency: subscription.currency,
//         plan_description: plan_description,
//         payment_status: 'Pending',
//         created_at: new Date(),
//       });
  
//       await newSubscription.save();
  
//       res.status(200).json({ subscription_id: subscription.id, message: 'Subscription created successfully' });
//     } catch (error) {
//       console.error('Error creating subscription:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
  

// // Start the server
// const PORT = process.env.PORT || 9000;
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });





const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Razorpay = require('razorpay');
const cors = require('cors');
const Payment = require('./model/PaymentModel'); // Import the Payment model
const crypto = require('crypto');
const userrouter = require('./router/userRouter'); 
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Razorpay setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Store your Razorpay Key ID in .env
  key_secret: process.env.RAZORPAY_KEY_SECRET // Store Razorpay Secret in .env
});

// Razorpay subscription creation endpoint
app.post('/create-subscription', async (req, res) => {
  try {
    const { plan_id, plan_description } = req.body;

    if (!plan_id || !plan_description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const subscriptionOptions = {
      plan_id: plan_id,
      customer_notify: 1,
      total_count: 12,
    };

    const subscription = await razorpay.subscriptions.create(subscriptionOptions);

    // Debug output to check subscription details
    console.log('Subscription:', subscription);

    const amount = subscription.total_amount / 100;
    if (isNaN(amount)) {
      throw new Error('Invalid amount calculated');
    }

    const newSubscription = new Payment({
      subscription_id: subscription.id,
      plan_id: plan_id,
      amount: amount,
      currency: subscription.currency,
      plan_description: plan_description,
      payment_status: 'Pending',
      created_at: new Date(),
    });

    await newSubscription.save();

    res.status(200).json({ subscription_id: subscription.id, message: 'Subscription created successfully' });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Razorpay order creation for payment
app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // Amount in paise (1 INR = 100 paise)
      currency: currency,
      receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify payment
app.post('/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    try {
      // Update payment status in the database
      const payment = await Payment.findOneAndUpdate(
        { subscription_id: razorpay_order_id },
        { payment_status: 'Success', payment_id: razorpay_payment_id },
        { new: true }
      );

      if (!payment) {
        return res.status(404).json({ error: 'Subscription not found' });
      }

      res.status(200).json({ message: 'Payment verified successfully', payment });
    } catch (error) {
      console.error('Error updating payment status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

