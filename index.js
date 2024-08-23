const express = require('express');
const path = require('path');

class RequestMonitor {
    constructor(app) {
        this.app = app;
        this.requestCount = 0;
        this.secondData = [];
        this.minuteData = [];
        this.hourData = [];
        this.logData=[];
        // this.initializeTime = new Date(); // Capture the time when monitoring starts
        this.initializeMonitoring();
        this.setupRoutes();
    }

    resetCounters() {
        this.requestCount = 0;
    }

    updateData() {
        this.secondData.push(this.requestCount);
        this.resetCounters();
        if (this.secondData.length > 60) {
            var secTotal = 0;
            this.secondData.map((data) => {
                secTotal += data;
            })
            this.minuteData.push(secTotal);
            this.secondData = [];
        }
        if (this.minuteData > 60) {
            var minTotal = 0;
            this.minuteData.map((data) => {
                minTotal += data;
            })
            this.hourData.push(minTotal);
        }

        if (this.hourData.length > 24) {
            this.hourData = [];
        }
    }

    fillInitialData() {
        const now = new Date();
        const hoursElapsed = String(now.getHours()).padStart(2, '0');
        const minutesElapsed = String(now.getMinutes()).padStart(2, '0');
        const secondsElapsed = String(now.getSeconds()).padStart(2, '0');

        // Fill secondData


        for (let i = 0; i < secondsElapsed; i++) {
            this.secondData.push(0);
        }

        // Fill minuteData (based on accumulated seconds)
        for (let i = 0; i < minutesElapsed; i++) {
            const totalSeconds = this.secondData.slice(i * 60, (i + 1) * 60).reduce((acc, data) => acc + data, 0);
            this.minuteData.push(totalSeconds);
        }

        // Fill hourData (based on accumulated minutes)
        for (let i = 0; i < hoursElapsed; i++) {
            const totalMinutes = this.minuteData.slice(i * 60, (i + 1) * 60).reduce((acc, data) => acc + data, 0);
            this.hourData.push(totalMinutes);
        }
    }

    initializeMonitoring() {
        this.fillInitialData(); // Fill initial data with zeros

        this.app.use((req, res, next) => {
            if (req.url !== "/api/monitor" && req.url !== "/api/monitor-dashboard/" && req.url !== "/api/monitor-dashboard") {
                this.requestCount++;
                const start = process.hrtime();
    
                // On response finish, calculate duration and log details
                res.on('finish', () => {
                    const diff = process.hrtime(start);
                    const duration = (diff[0] * 1e9 + diff[1]) / 1e6; // Convert to milliseconds
                    var time=new Date().toLocaleString();
                    var logDetails=`${time} ${req.method} ${req.url} ${res.statusCode} ${duration.toFixed(2)} ms`;
                    this.logData.push(logDetails);
                    if(this.logData.length>100){
                        this.logData.shift()
                    }
                });
            }
            next();
        });

        setInterval(() => this.updateData(), 1000); // Track per second
    }

    setupRoutes() {
        this.app.get('/monitor', (req, res) => {
            res.json({
                secondData: this.secondData,
                minuteData: this.minuteData,
                hourData: this.hourData,
                logData:this.logData
            });
        });

        this.app.use('/api/monitor-dashboard', express.static(path.join(__dirname, 'public')));
    }
}

module.exports = RequestMonitor;
