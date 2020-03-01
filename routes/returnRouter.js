const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var authenticate = require('../authenticate');

const Returns = require('../models/returnStatus');

const cors = require('./cors');

const issueRouter = express.Router();

issueRouter.use(bodyParser.json());

issueRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
        Returns.find({})
        .then((returns) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(returns);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Returns.create(req.body)
        .then((returnEntry) => {
            console.log('Issue Created ', returnEntry);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(returnEntry);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /returns');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Returns.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });

issueRouter.route('/:returnId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req,res,next) => {
        Returns.findById(req.params.returnId)
        .then((returnEntry) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(returnEntry);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /returns/'+ req.params.returnId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function (req, res, next) {
        Returns.findByIdAndUpdate(req.params.returnId, {
            $set: req.body
        }, { new: true })
        .then((returnEntry) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(returnEntry);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function (req, res, next) {
        Returns.findByIdAndRemove(req.params.returnId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });    

issueRouter.route('/:userId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req,res,next) => {
        Returns.find({user: req.params.userId})
        .then((returns) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(returns);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Returns.create(req.body)
        .then((returnEntry) => {
            console.log('Issue Created ', returnEntry);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(returnEntry);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {
        res.statusCode = 403;
        res.end('PUT operation not supported on /returns/' + req.params.userId);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser,  function (req, res, next) {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /returns/' + req.params.userId);
    });

issueRouter.route('/:bookId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
        Returns.find({book: req.params.bookId})
        .then((returns) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(returns);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /returns/' + req.params.bookId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function (req, res, next) {
        res.statusCode = 403;
        res.end('PUT operation not supported on /returns' + req.params.bookId);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  function (req, res, next) {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /returns' + req.params.bookId);
    });

module.exports = issueRouter;