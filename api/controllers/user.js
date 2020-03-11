const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./../models/user')

exports.user_login = (req, res, next) => {
    console.log(req.body.email, req.body.password);

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    ms: 'tai khoan hoac mat khau khong dung'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, rs) => {
                if (err) {
                    return res.status(401).json({
                        ms: 'ac '
                    })
                }
                if (rs) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "9999999d"
                        },
                    )

                    User.find({ _id: user[0]._id })
                        .updateOne({ $set: { token: token } })
                        .exec()
                        .then(result => {
                            if (result) {
                                console.log(
                                    {
                                        data: result,
                                        message: "success",
                                        msg: "update token thanh cong"
                                    }
                                );

                            }
                        })
                        .catch(err => {
                            console.log(err, 'loi cap nhat token');

                        })

                    return res.status(200).json({
                        ms: 'dang nhap thanh cong',
                        token
                    })
                }
                return res.status(500).json({
                    err: "sai mat khau"
                })
            })
        })
}

exports.get_user = (req, res, next) => {
    User.find()
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

exports.sign_up = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec().then(user => {
            if (user.length > 0) {
                return res.status(409).json({
                    ms: "mail exists"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            err
                        })
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name
                        })
                        // user.save()
                        //     .then((rs) => {
                        //         res.status(200).json({
                        //             ms: "dk thanh cong",
                        //             rs
                        //         })
                        //     })
                        //     .catch(err => {
                        //         console.log(err);
                        //     })
                    }
                })
            }
        }).catch()
}

exports.delete_user = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(rs => {
            res.status(200).json({
                ms: 'user deleted',
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

exports.check_token = (req, res, next) => {
    User.findOne({ token: req.body.token })
        .exec()
        .then(rs => {
            if (rs)
                return res.status(200).json({
                    rs: true
                })
            else 
                return res.status(200).json({
                    rs : false,
                    ms: 'not found'
                })
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                err,
                rs: false
            })
        })
}