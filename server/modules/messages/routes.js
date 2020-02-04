const express = require('express');
const router = express.Router();
const MessageService = require('./service');

const getUser = (req, res) => {
    if (req.headers['x-user']) return req.headers['x-user'];
    res.status(400).send({ message: 'X-USER is not present on the headers' });
};

const responseWrapper = (callback) => async (req, res) => {
    try {
        const body = await callback(req, res);
        res.send(body);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

router.get('/', responseWrapper((req, res) => (
    MessageService
        .on(getUser(req, res))
        .list(req.query.q)
)));

router.put('/:id/check', responseWrapper((req, res) => (
    MessageService
        .on(getUser(req, res))
        .checkById(req.params.id)
)));

router.post('/', responseWrapper((req, res) => (
    MessageService
        .on(getUser(req, res))
        .create(req.body)
)));

module.exports = router;
