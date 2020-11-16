const router = require('express').Router()
const { addOne } = require('../controllers/database_mongo')
const { collection_visitors } = require('../config').mongo
const path = require('path')
const { cwd } = require('process')
const crypto = require('crypto')

//define routes
router.get('/downloadmewpew', (req, res) => {
    const file = cwd() + '/files/MewPew/dist.rar'
    res.download(file, err => console.log(err))
})

router.get('/downloadmewpew_linux', (req, res) => {
    const file = cwd() + '/files/MewPew/dist_linux.rar'
    res.download(file, err => console.log(err))
})

router.get('/downloadsubmarines', (req, res) => {
    const file = cwd() + '/files/Submarines/dist.rar'
    res.download(file, err => console.log(err))
})

router.get('/downloadsubmarines_linux', (req, res) => {
    const file = cwd() + '/files/Submarines/dist_linux.rar'
    res.download(file, err => console.log(err))
})

router.get('/downloadcv', (req, res) => {
    const file = cwd() + '/files/Emily Matheys, CV.pdf'
    res.download(file, err => console.log(err))
})

router.get('*', async (req, res) => {
    const ip = crypto.createHash('md5').update(req.headers['x-forwarded-for']).digest('hex')
    const added = await addOne(collection_visitors, { ip: ip, date: Date.now() })
    res.sendFile(path.join(cwd(), '/public/index.html'))
})

module.exports = router