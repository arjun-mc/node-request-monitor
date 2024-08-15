const express = require('express');
const RequestMonitor = require('./index');

const app = express();
const monitor = new RequestMonitor(app);

app.get('/api/some-endpoint', (req, res) => {
    res.send('API response');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
