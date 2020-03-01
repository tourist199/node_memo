const User = require('./../models/user')
const Note = require('./../models/note')
const mongoose = require('mongoose')
const moment = require('moment')


exports.new_note = (req, res, next) => {
    userData = req.userData;
    User.findById(userData.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    err: "user not found1"
                })
            }

            const temp = new Note({
                _id: mongoose.Types.ObjectId(),
                title: req.body.title,
                createDate: moment(),
                content: req.body.content,
                category: req.body.category,
                userId: userData.userId,
                clip: false
            })
            return temp.save()
        })
        .then(rs => {
            res.status(201).json({
                ms: "note stored",
                createNote: rs
            })
        })
        .catch(err => {
            res.status(500).json({
                err,
                ms: "err"
            })
        })
}

exports.get_all_notes = (req, res, next) => {
    userData = req.userData;
    Note.find({ userId: userData.userId })
        .populate('category')
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

exports.get_notes_by_cate = (req, res, next) => {
    userData = req.userData;
    cateId = req.params.id;
    console.log(cateId);

    Note.find({ userId: userData.userId, category: cateId })
        .populate('category')
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

exports.get_notes_by_id = (req, res, next) => {
    userData = req.userData;
    id = req.params.id;
    Note.find({ userId: userData.userId, _id: id })
        .populate('category')
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

exports.update_note = (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    var d = new Date();
    d.setUTCHours(d.getUTCHours() - (d.getTimezoneOffset() / 60));
    req.body.createDate = d
    Note.find({ _id: id })
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

exports.set_note_clip_true = (req, res, next) => {
    const id = req.params.id;
    const data = { clip: true }
    Note.find({ _id: id })
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
exports.set_note_clip_false = (req, res, next) => {
    const id = req.params.id;
    const data = { clip: false }
    Note.find({ _id: id })
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


exports.delete_note = (req, res, next) => {
    Note.remove({
        _id: req.params.id,
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

exports.delete_note_to_trash = (req, res, next) => {
    const id = req.params.id;
    Note.find({ _id: id })
        .updateOne({ $set: {deleted: true, clip:false} })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    data: result,
                    message: "delete note to trash success"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.restore_note = (req, res, next) => {
    const id = req.params.id;
    Note.find({ _id: id })
        .updateOne({ $set: {deleted: false} })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    data: result,
                    message: "delete note to trash success"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}