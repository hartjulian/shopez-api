const express = require('express');
const router = express.Router();
const productDb = require('../db/product');
const validator = require('validator');

router.get('/', async (req, res) => {
    const allProducts = await productDb.getAllProducts();
    res.status(200).json(allProducts);
});

router.get('/:productId', async (req, res) => {
    const productId = req.params.productId;
    if (!validator.isInt(productId)) {
        return res.status(400).send('Bad request');
    }
    const product = await productDb.getOneProduct(productId);
    if (product[0]) {
        res.status(200).json(product);
    } else {
        res.status(404).send('Item not found');
    };
});

router.post('/', async (req, res) => {
    const { description, price, brand, model } = req.body;
    if (description && validator.isCurrency(price) && brand && model) {
        const productArray = [description, price, brand, model];
        const rowsUpdated = await productDb.insertProduct(productArray);
        if (rowsUpdated === 1) {
            res.status(201).send('New product record created');
        } else {
            res.status(409).send('An unexpected error occurred and the product record was not created');
        }
    } else {
        res.status(400).send('Bad request');
    };
});

router.put('/:productId', async (req, res) => {
    const { description, price, brand, model } = req.body;
    const productId = req.params.productId;
    if (validator.isInt(productId) && description && validator.isCurrency(price) && brand && model) {
        const productArray = [productId, description, price, brand, model];
        const rowsUpdated = await productDb.updateProduct(productArray);
        if (rowsUpdated === 1) {
            res.status(200).send(`Product record ${productId} updated`);
        } else {
            res.status(409).send('An unexpected error occurred and the product record was not updated');
        }
    } else {
        res.status(400).send('Bad request');
    };    
});

router.delete('/:productId', async (req, res) => {
    const productId = req.params.productId;
    if (!validator.isInt(productId)) {
        return res.status(400).send('Bad request');
    }
    const rowsUpdated = await productDb.deleteProduct(productId);
    if (rowsUpdated === 1) {
        res.status(200).send(`Product record ${productId} deleted`);
    } else {
        res.status(404).send('Item not found');
    };
});

module.exports = router;