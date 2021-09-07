const express = require('express')
const bodyParser = require('body-parser')
const authenticate = require('../authenticate')
const multer = require('multer')
const cors = require('./cors')

const { requireSignin, verifyAdmin, verifyToken } = require('../authenticate')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files')
    },

    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(docx|doc|pdf)$/)) {
        return cb(new Error('You can upload only doc, docx and pdf files!'), false)
    }
    cb(null, true)
}

const upload = multer({ storage: storage, fileFilter: imageFileFilter})

const uploadRouter = express.Router()

// uploadRouter.use(bodyParser.json())

uploadRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
.get(cors.cors, requireSignin, verifyToken, verifyAdmin, (req, res, next) => {
    res.statusCode = 403
    res.end('GET operation not supported on /imageUpload')
})
.post(cors.corsWithOptions, upload.single('file'), (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(req.file.path)
})
.put(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /imageUpload')
})
.delete(cors.corsWithOptions, requireSignin, verifyToken, verifyAdmin, (req, res, next) => {
    res.statusCode = 403
    res.end('DELETE operation not supported on /imageUpload')
})

module.exports = uploadRouter