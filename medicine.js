const mongoose = require('mongoose');
const Medicine = require('./models/medicine');


mongoose.connect('mongodb://127.0.0.1:27017/medicineDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo connection open')

    })
    .catch(err => {
        console.log("oh no, Mongo error", err)
    })

const m = new Medicine({
    name: 'Halls',
    dose: 3,
    purpose: 'To treat sore throat and cough.'
})
m.save();
