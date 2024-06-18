// 'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const email = require('./routes/email');

const app = express();

app.use(express.json());
// app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));
app.use(cors());
app.use(bodyParser.json());

app.use('/email',email.routes);

app.get('/', (req,res) => {
    res.send('Welcome to the Alumni portal');
    console.log('Welcome to the Alumni portal');
});

app.listen(4444, () => {
    console.log('Server started on port 4444');
});
