const router = require('express').Router()
const serverRouter = require('./serverRouter')
const md5 = require('md5')
const { addOne } = require('../controllers/database_mongo')
const { collection_visitors } = require('../config').db
const path = require('path')
const { cwd } = require('process')

//define routes
router.use('/server', serverRouter)

router.get('/downloadmewpew', (req, res) => {
    const file = cwd() + '/files/dist.rar'
    res.download(file, err => console.log(err))
})

router.get('/downloadmewpew_linux', (req, res) => {
    const file = cwd() + '/files/dist_linux.rar'
    res.download(file, err => console.log(err))
})

router.get('*', async (req, res) => {
    const ip = md5(md5(md5(req.ip)))
    await addOne(collection_visitors, { ip: ip, date: Date.now() })
    res.sendFile(path.join(cwd(), '/public/index.html'))
})

module.exports = router