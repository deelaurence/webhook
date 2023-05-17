const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
    res.send("hello")
})
app.post('/webhook', (req, res) => {
    // Process the webhook payload here
    console.log('Received webhook:', req.body);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
