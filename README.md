# Node Request Monitor

Node Request Monitor is a lightweight Node.js package designed for monitoring HTTP requests in your application. It displays real-time charts for requests per second, minute, and hour, and shows log data with color-coded HTTP status codes directly in a web page.

## Installation

Use the package manager [npm](https://www.npmjs.com/package/node-request-monitor) to install Node Request Monitor.

```bash
npm install node-request-monitor
```

## Usage

```node
const express = require('express');
const RequestMonitor = require('node-request-monitor');
const app = express();
const monitor = new RequestMonitor(app);

app.get('/api/some-endpoint', (req, res) => {
    res.send('API response');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```
You can view dashboard on 

http://localhost:3000/api/monitor-dashboard

If you want the JSON data, you can request it from 

http://localhost:3000/api/monitor
## Visuals

Here is a screenshot of the monitoring dashboard:

![Monitoring Dashboard](https://prutech.org/MediaServer/api/Media/Data/8303a79b1e/node-request-monitor.png)
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
