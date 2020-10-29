const router = require('express').Router()
const { table_users } = require('../../config').db
const { insertOne, selectMany, updateOne } = require('../../controllers/database_postgres')
const { v4: generateVer } = require('uuid')
const { sendMail } = require('../../controllers/mail')
const md5 = require('md5')

const sendErr = (res, err) => {
    res.status(200).send({ success: false, err: err })
}

router.post('/postUser', async (req, res) => {
    
    if (!req.body.name || !req.body.mail || !req.body.password)
        return sendErr(res, "One of the fields arrived empty")

    const query = await selectMany(table_users, ["*"], { mail: req.body.mail })
    if (query.rows.length > 0)
        return sendErr(res, "Username already exists")

    const ver = generateVer()
    const insert = await insertOne(table_users, ["name", "mail", "password", "createdAt", "verified", "verification"], [req.body.name, req.body.mail, req.body.password, Date.now(), 'false', ver])
    sendMail(req.body.mail, ver)

    res.status(200).send({ success: true, mail: req.body.mail })
 
})

router.get('/performlogin', async (req, res) => {

    if (!req.query.mail || !req.query.pass)
        return sendErr(res, "One of the fields is empty")
    const test = await selectMany(table_users, ["*"], {})
    const query = await selectMany(table_users, ["*"], { mail: req.query.mail, password: md5(md5(md5(req.query.pass))), verified: "true" })
    if (query.rows.length == 0)
        return sendErr(res, "Username or password are invalid")

    res.status(200).send({ success: true })
    
})

router.get('/resend/:mail', async (req, res) => {
    const query = await selectMany(table_users, ["verification"], { mail: req.params.mail })
    if (query.rows.length == 0)
        return sendErr(res, "Email not found")

    sendMail(req.params.mail, query.rows[0].verification)
    res.status(200).send({ success: true })
})

router.get('/verify/:code', async (req, res) => {
    const query = await selectMany(table_users, ["mail"], { verification: req.params.code, verified: "false" })
    if (query.rows.length == 0)
        return sendErr(res, "Email not found")

    const update = await updateOne(table_users, { verified: "true" }, { verification: req.params.code },)
    if (query.rows.length == 0)
        return sendErr("Server error")

    res.status(200).send({ success: true })
})

module.exports = router