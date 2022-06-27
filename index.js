const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Medicine = require('./models/medicine')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log('Express server started.')
})

mongoose.connect('mongodb://127.0.0.1:27017/medicineDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo connection open')

    })
    .catch(err => {
        console.log("oh no, Mongo error", err)
    })

app.get('/medicine', async (req, res) => {
    const medicine = await Medicine.find({});
    res.render('medicine/index', { medicine });
})