const mongoose = require('mongoose')
const User = require('./../models/user')
const Category = require('./../models/category')

exports.get_cate = (req, res, next) => {
    userData = req.userData;
    Category.find({ userId: userData.userId })
        .exec()
        .then(rs => {
            res.status(200).json({
                rs
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err
            })
        })
}

exports.new_cate = (req, res, next) => {
    userData = req.userData;
    User.findById(userData.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    err: "user not found"
                })
            }
            const category = new Category({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                userId: userData.userId
            })
            return category.save()
        })
        .then(rs => {
            res.status(201).json({
                ms: "category stored",
                createOrder: rs
            })
        })
        .catch(err => {
            res.status(500).json({
                err,
                ms: "user not found"
            })
        })
}

exports.delete_cate = (req, res, next) => {
    Category.remove({
        _id: req.params.cateId,
        userId: req.userData.userId
    })
        .exec()
        .then(rs => {
            res.status(200).json({
                ms: 'deleted',
                rs
            })
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
}

exports.update_cate = (req, res, next) => {
    const id = req.params.cateId;
    const data = req.body;

    Category.find({ _id: id })
        .updateOne({ $set: data })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    data: result,
                    message: "success"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

