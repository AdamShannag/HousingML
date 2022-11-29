const express = require('express')
const { spawn } = require('child_process')
const path = require('path');
const app = express()
app.use(express.json())

const port = process.env.PORT || 9070;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/pages/index.html'));
});

app.post("/api/predict", (req, res) => {
    let dataToSend;
    let pyFile = './python/price.py'
    // spawn new child process to call the python script
    const python = spawn('python',
        [pyFile,
            req.body.avgAreaIncome,
            req.body.avgAreaHouseAge,
            req.body.avgAreaNumberOfRooms,
            req.body.avgAreaNumberOfBedrooms,
            req.body.areaPopulation]);
    // collect data from script
    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        res.json(JSON.parse(dataToSend))
    });
})
app.listen(port, () => console.log(`Listening on port ${port}!`))