const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var authenticate = require('../authenticate');

const Issues = require('../models/issueStatus');

const cors = require('./cors');

const issueRouter = express.Router();

issueRouter.use(bodyParser.json());

issueRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
        Issues.find({})
        .then((issues) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(issues);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Issues.create(req.body)
        .then((issue) => {
            console.log('Issue Created ', issue);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(issue);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /issues');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Issues.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });

issueRouter.route('/:issueId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req,res,next) => {
        Issues.findById(req.params.issueId)
        .then((issue) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(issue);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /issues/'+ req.params.issueId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function (req, res, next) {
        Issues.findByIdAndUpdate(req.params.issueId, {
            $set: req.body
        }, { new: true })
        .then((issue) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(issue);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function (req, res, next) {
        Issues.findByIdAndRemove(req.params.issueId)
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
        Issues.find({user: req.params.userId})
        .then((issues) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(issues);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Issues.create(req.body)
        .then((issue) => {
            console.log('Issue Created ', issue);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(issue);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {
        res.statusCode = 403;
        res.end('PUT operation not supported on /issues/' + req.params.userId);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser,  function (req, res, next) {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /issues/' + req.params.userId);
    });

issueRouter.route('/:bookId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
        Issues.find({book: req.params.bookId})
        .then((issues) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(issues);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /issues/' + req.params.bookId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, function (req, res, next) {
        res.statusCode = 403;
        res.end('PUT operation not supported on /issues' + req.params.bookId);
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  function (req, res, next) {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /issues' + req.params.bookId);
    });

module.exports = issueRouter;