const mongoose = require('mongoose');

mongoose.connect(require('../config/configMongo').mongoURI,{
    useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));