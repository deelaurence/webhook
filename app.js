require("dotenv").config();
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
    res.send("hello")
})
const crypto = require('crypto');
const secretKey = process.env.paystack_test_secret_key;
console.log(secretKey)

function verifyWebhookSignature(headerSignature, requestPayload) {
    const computedSignature = crypto
        .createHmac('sha512', secretKey)
        .update(requestPayload)
        .digest('hex');
    console.log(headerSignature, computedSignature)
    return headerSignature === computedSignature;
}
app.post('/webhook', (req, res) => {
    // Verify the signature
    const headerSignature = req.headers['paystack-signature'];
    const isSignatureValid = verifyWebhookSignature(headerSignature, JSON.stringify(req.body));
    if (!isSignatureValid) {
        res.status(400).send('Invalid signature');
        return;
    }

    // Process the webhook event
    const event = req.body;
    const eventType = event.event;
    const eventData = event.data;

    // Handle the event based on the event type
    if (eventType === 'charge.success') {

        // save eventData to db
        console.log(eventData)
    }
    else if (eventType === 'charge.failed') {
        // Handle failed payment event
        console.log('Payment failed.');
        // Take appropriate actions like notifying the user, logging the failure, etc.
    } else if (eventType === 'charge.refunded') {
        // Handle refunded payment event
        console.log('Payment refunded.');
        // Update your database or trigger any necessary actions related to the refund process
    }
    else {
        // Handle other events as needed
        console.log(eventType)
    }
    // Respond with a success status
    res.sendStatus(200);
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
