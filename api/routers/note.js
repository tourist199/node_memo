const express = require('express')
const router = express.Router()
const NoteController = require('./../controllers/note')
const checkAuth = require('./../middleware/check-auth')

router.post('/new-note', checkAuth, NoteController.new_note)

router.get('/get-all', checkAuth, NoteController.get_all_notes)

router.get('/get-note-by-cate/:id', checkAuth, NoteController.get_notes_by_cate)

router.get('/get-note-by-id/:id', checkAuth, NoteController.get_notes_by_id)

router.patch('/edit/:id', checkAuth, NoteController.update_note)

router.patch('/change-idcate/:idMemo', checkAuth, NoteController.change_note_idCate)

router.patch('/set-clip-true/:id', checkAuth, NoteController.set_note_clip_true)

router.patch('/set-clip-false/:id', checkAuth, NoteController.set_note_clip_false)

router.delete('/delete/:id', checkAuth, NoteController.delete_note)

router.patch('/delete_to_trash/:id', checkAuth, NoteController.delete_note_to_trash)

router.patch('/restore/:id', checkAuth, NoteController.restore_note)

module.exports = router