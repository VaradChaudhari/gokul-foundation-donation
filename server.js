const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
    key_secret: 'YOUR_RAZORPAY_KEY_SECRET' // Replace with your Razorpay Key Secret
});

// Endpoint to create a payment order
app.post('/api/donate', async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        receipt: `receipt#${Math.floor(Math.random() * 10000)}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
