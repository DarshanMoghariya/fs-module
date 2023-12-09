const express = require('express')
const router = express.Router()
const fs = require('fs');

const productData = fs.readFileSync('data/product.json');
const p_Data = JSON.parse(productData);

router.get('/', (req, res) => {
    try {
        res.status(200).json({ status: true, data: p_Data, message: 'data get' })
    } catch (error) {
        console.log('error', error);
    }
})

router.get('/:id', (req, res) => {
    try {
        p_Data.find(x => x.id == req.params.body)
        res.status(200).json({ status: true, data: p_Data, message: 'single data get' })
    } catch (error) {
        console.log('error', error);
    }

})

router.post('/add', (req, res) => {
    try {
        p_Data.push({ ...req.body, id: p_Data[(p_Data.length - 1)].id + 1 })
        fs.writeFileSync('data/product.json', JSON.stringify(p_Data));
        return res.status(200).json({ status: true, data: p_Data, message: 'data add' })
    } catch (error) {
        console.log('error', error);
    }

})

router.post('/update', (req, res) => {
    try {
        let findIndexData = p_Data.findIndex(x => x.id == req.query.id);
        p_Data.splice(findIndexData, 1, req.body)
        fs.writeFileSync('data/product.json', JSON.stringify(p_Data));
        return res.status(200).json({ stutas: true, data: p_Data, message: 'data update successfully' })
    } catch (error) {
        console.log('error', error);
    }

});

router.delete('/delete/:id', (req, res) => {
    try {
        let findIndexData = p_Data.findIndex(x => x.id == req.params.id);
        p_Data.splice(findIndexData, 1)
        fs.writeFileSync('data/product.json', JSON.stringify(p_Data));

        return res.status(200).json({ stutas: true, data: p_Data, message: 'data delete successfully' })
    } catch (error) {
        console.log('error', error);
    }

});


module.exports = router