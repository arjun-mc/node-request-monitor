Node Monitor MC
node-monitor-mc is a Node.js middleware for monitoring HTTP requests in an Express application. It tracks and aggregates request metrics over different intervals, including seconds, minutes, and hours. This package is useful for gaining insights into request patterns and overall application performance.

Features
Per Second Monitoring: Tracks the number of requests per second.
Per Minute Monitoring: Aggregates request data into per-minute intervals.
Per Hour Monitoring: Aggregates request data into per-hour intervals.
Initial Data Handling: Automatically fills initial data with zeros based on the start of the day.
Installation
To install node-monitor-mc, use npm:

bash
Copy code
npm install node-monitor-mc
Usage
Require and Configure Middleware

Import and configure node-monitor-mc in your Express application:

javascript
Copy code
const express = require('express');
const RequestMonitor = require('node-monitor-mc');

const app = express();
const monitor = new RequestMonitor(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
Access Monitoring Data

Endpoint: /monitor
Method: GET
Description: Provides JSON data with request counts for seconds, minutes, and hours.
Example response:

json
Copy code
{
    "secondData": [0, 0, 0, 0, 0, ...],
    "minuteData": [0, 0, 0, 0, 0, ...],
    "hourData": [0, 0, 0, 0, 0, ...]
}
Static Dashboard

Endpoint: /monitor-dashboard
Description: Serves static files from the public directory for a visual dashboard (ensure you have a public directory with your dashboard files).
Methods
resetCounters(): Resets the request count for the current second.

updateData(type, intervalData, length): Updates the interval data (type: 1 for seconds, 2 for minutes, 3 for hours).

fillInitialData(): Fills initial data with zeroes based on the time elapsed since the start of the day.

License
This package is licensed under the MIT License.

Contributing
Contributions are welcome! Please submit a pull request or open an issue for any feature requests or bugs.
