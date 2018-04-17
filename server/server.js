const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('./routes/api');
const mongoUtil = require('./utils').mongoUtil;

const port = 3000;
const app = new express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Hello From Server!');
});

mongoUtil.connectToMongoDB()
    .then(result => {
        app.listen(port, () => {
            console.log(`server is up on port : ${port}`);
        });
    })
