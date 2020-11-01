const router = require('express').Router()
const recipesRouter = require('./recipes/recipesRouter')
const weatherRouter = require('./weather/weatherRouter')
const saturnRouter = require('./saturn/saturnRouter')
const { getMany } = require('../controllers/database_mongo')
const { collection_visitors } = require('../config').mongo

router.use('/getVisitors', async (req, res) => {

    const lastWeek = Date.now() - (1000 * 60 * 60 * 24 * 7)
    const twoWeeks = lastWeek - (1000 * 60 * 60 * 24 * 7)
    const visitors = await getMany(collection_visitors, { date: { $gte: twoWeeks } })
    if (!visitors)
        return res.status(200).send({ success: false })

    const lVisitors = visitors.filter(element => element.date < lastWeek)
    let lVisitorsUnique = []
    lVisitors.forEach(element => {
        if (lVisitorsUnique.findIndex(subElement => subElement.ip == element.ip) == -1)
            lVisitorsUnique.push(element)
    })
    
    const tVisitors = visitors.filter(element => element.date >= lastWeek)
    let tVisitorsUnique = []
    tVisitors.forEach(element => {
        if (tVisitorsUnique.findIndex(subElement => subElement.ip == element.ip) == -1)
            tVisitorsUnique.push(element)
    })

    res.status(200).send({
        success: true,
        lastWeek: lVisitors.map(element => element.date),
        lastWeekUnique: lVisitorsUnique.map(element => element.date),
        thisWeek: tVisitors.map(element => element.date),
        thisWeekUnique: tVisitorsUnique.map(element => element.date)
    })
    
})

//define more routers
router.use('/recipes', recipesRouter)
router.use('/weather', weatherRouter)
router.use('/saturn', saturnRouter)

module.exports = router