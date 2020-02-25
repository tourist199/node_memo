const express = require('express')
const router = express.Router()
const checkAuth = require('./../middleware/check-auth')

const CategoryController = require('./../controllers/category')

router.get('/',checkAuth, CategoryController.get_cate)

router.post('/new-cate', checkAuth, CategoryController.new_cate)

router.delete("/:cateId", checkAuth, CategoryController.delete_cate)

router.patch("/edit/:cateId", checkAuth, CategoryController.update_cate)

module.exports = router