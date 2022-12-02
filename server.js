// Dependencies Required, Routes for the Server, & Express Server
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require ('./routes/htmlRoutes');
const app = express();

// Setting the Port
const PORT = process.env.PORT || 3001;

// Middleware for parsing data
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Port Listener w/ Console Log stating which port it is listening on
app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
});