const express = require('express');
const router = express.Router();
const fs = require('fs');
const { route } = require('./user');

const studentData = fs.readFileSync('data/student.json');
const data = JSON.parse(studentData);

router.get('/', (req, res) => {
    try {
        return res.status(200).json({ stutas: true, data, message: 'data get successfully' })
    } catch (error) {
        console.log('error',error);
    }
});

router.get('/:id', (req, res) => {
    try {
        data.find(x => x.id == req.params.id)
    return res.status(200).json({ stutas: true, data: data, message: 'single data get successfully' })
    } catch (error) {
        console.log('error',error);
    }
    
});

router.post('/add', (req, res) => {
    try {
        data.push({ ...req.body, id : data[(data.length - 1)].id + 1 })
        fs.writeFileSync( 'data/student.json',JSON.stringify(data));
        return res.status(200).json({ stutas: true, data: data, message: 'data add successfully' })
    } catch (error) {
        console.log('error',error);
    }
  
});

router.post('/update', (req, res) => {
    try {
        let findIndexData = data.findIndex(x => x.id == req.query.id);
    data.splice(findIndexData , 1, req.body)
    fs.writeFileSync( 'data/student.json',JSON.stringify(data));
    return res.status(200).json({ stutas: true, data: data, message: 'data update successfully' })
    } catch (error) {
        console.log('error',error);
    }
    
});

router.delete('/delete/:id', (req, res) => {
    try {
        let findIndexData = data.findIndex(x => x.id == req.params.id);
        data.splice(findIndexData , 1)
        fs.writeFileSync( 'data/student.json',JSON.stringify(data));
        return res.status(200).json({ stutas: true, data: data, message: 'data delete successfully' })
    } catch (error) {
        console.log('error',error);
    }
   
});

module.exports = router;