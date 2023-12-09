const express = require('express')
const router = express.Router();
const fs = require('fs');

const data = fs.readFileSync('data/user.json');
let userData = JSON.parse(data);

router.get('/', (req, res) => {
    try {
        return res.status(200).json({ stutas: true,data: userData, message: 'data get suceesfully' })
    } catch (error) {
        console.log('error', error);
    }
});

router.get('/:id', (req, res) => {
    try {
        let findData = userData.find((x) => x.id == req.params.id);
        return res.status(200).json({ stutas: true, data: findData, message: 'single data get succesfuly' })
    } catch (error) {
        console.log('error', error);
    }

});


router.post('/add', (req, res) => {
    try {
        userData.push({ ...req.body, id: userData[(userData.length - 1)].id + 1 })
        
        fs.writeFileSync('data/user.json', JSON.stringify(userData));
        return res.status(200).json({ stutas: true, data: userData, message: 'data add successfully' })
    } catch (error) {
        console.log('error', error);
    }

});


router.post('/update', (req, res) => {
    try {
        let editData = userData.findIndex((x) => x.id == req.query.id);
        req.query.id = Number(req.query.id)
        userData.splice(editData, 1, req.body)
        fs.writeFileSync('data/user.json', JSON.stringify(userData));
        return res.status(200).json({ stutas: true, data: userData, message: 'data update successfully' })
    } catch (error) {
        console.log('error', error);
    }

});

router.delete('/del/:id', (req, res) => {
    try {
        let editData = userData.findIndex((x) => x.id == req.params.id)
        userData.splice(editData, 1);
        fs.writeFileSync('data/user.json', JSON.stringify(userData));
        return res.status(200).json({ status: true, data: userData, message: 'data delete successfully' })
    } catch (error) {
        console.log('error', error);
    }

});


module.exports = router


