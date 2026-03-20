const express = require('express');
const router = express.Router();
const customerDb = require('../db/customer');
const validator = require('validator');

router.get('/', async (req, res) => {
    const allCustomers = await customerDb.getAllCustomers();
    res.status(200).json(allCustomers);
});

router.post('/', async (req, res) => {
    const { firstName, lastName, email, phone } = req.body;
    if (email && validator.isEmail(email)) {
        const customerArray = [firstName, lastName, email, phone];
        const rowsUpdated = await customerDb.createNewCustomer(customerArray);
        if (rowsUpdated === 1) {
            res.status(201).send('New customer record created');
        } else {
            res.status(409).send('An unexpected error occurred and the customer record was not created');
        }
    } else {
        res.status(400).send('Bad request');
    };
});

router.get('/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    if (!validator.isInt(customerId)) {
        return res.status(400).send('Bad request');
    }
    const customer = await customerDb.getOneCustomer(customerId);
    if (customer) {
        res.status(200).json(customer);
    } else {
        res.status(404).send('Item not found');
    };
});

router.put('/:customerId', async (req, res) => {
    const { firstName, lastName, email, phone } = req.body;
    const customerId = req.params.customerId;
    if (validator.isInt(customerId) && email) {
        const customerArray = [customerId, firstName, lastName, email, phone];
        const rowsUpdated = await customerDb.updateCustomer(customerArray);
        if (rowsUpdated === 1) {
            res.status(200).send(`Customer record ${customerId} updated`);
        } else {
            res.status(409).send('An unexpected error occurred and the customer record was not updated');
        }
    } else {
        res.status(400).send('Bad request');
    };    
});

router.delete('/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    if (!validator.isInt(customerId)) {
        return res.status(400).send('Bad request');
    }
    const rowsUpdated = await customerDb.deleteCustomer(customerId);
    if (rowsUpdated === 1) {
        res.status(200).send(`Customer record ${customerId} deleted`);
    } else {
        res.status(404).send('Item not found');
    };
});

module.exports = router;