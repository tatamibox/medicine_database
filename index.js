const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Medicine = require('./models/medicine');
const methodOverride = require('method-override');
const { findByIdAndDelete } = require('./models/medicine');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
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

app.delete('/medicine/:id', async (req, res) => {
    const { id } = req.params;
    const deletedMedicine = await Medicine.findByIdAndDelete(id);
    res.redirect('/medicine');
})
app.get('/medicine/new', (req, res) => {
    res.render('medicine/new');
})
app.get('/medicine/:id', async (req, res) => {
    const { id } = req.params;
    const medicine = await Medicine.findById(id);
    res.render('medicine/show', { medicine })
})
app.get('/medicine/:id/edit', async (req, res) => {
    const { id } = req.params;
    const medicine = await Medicine.findById(id);
    res.render('medicine/edit', { medicine });
})
app.post('/medicine', async (req, res) => {
    const newMedicine = new Medicine(req.body);
    await newMedicine.save();
    res.redirect(`/medicine/${newMedicine._id}`)
})



