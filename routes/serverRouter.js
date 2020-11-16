const router = require('express').Router()
const { getMany } = require('../controllers/database_mongo')
const { collection_visitors } = require('../config').mongo

const uniqueCount = (arr) => {

    let newArr =[]
    arr.forEach(element => {
        if (newArr.findIndex(subElement => subElement.ip == element.ip) == -1)
         newArr.push(element)
    })

    return newArr
}

const setByDays = (data, factor = 0) => {
    let weekDays = [0, 0, 0, 0, 0, 0, 0]

    data.forEach(element => {
        const day = ((Date.now() - element) / 1000 / 60 / 60 / 24) - factor
        if (day <= 1)
            weekDays[0]++
        else if (day > 1 && day <= 2)
            weekDays[1]++
        else if (day > 2 && day <= 3)
            weekDays[2]++
        else if (day > 3 && day <= 4)
            weekDays[3]++
        else if (day > 4 && day <= 5)
            weekDays[4]++
        else if (day > 5 && day <= 6)
            weekDays[5]++
        else if (day > 6 && day <= 7)
            weekDays[6]++
    })

    for (let i = weekDays.length - 1; i > 1; i--) {
        if (weekDays[i] == 0)
            weekDays[i] = null
        else
            break
    }

    return weekDays
}

router.use('/getVisitors', async (req, res) => {

    const lastWeek = Date.now() - (1000 * 60 * 60 * 24 * 7)
    const twoWeeks = lastWeek - (1000 * 60 * 60 * 24 * 7)

    const visitors = await getMany(collection_visitors, { date: { $gte: twoWeeks } })
    if (!visitors)
        return res.status(200).send({ success: false })

    const lVisitors = visitors.filter(element => element.date < lastWeek)
    const lVisitorsUnique = uniqueCount(lVisitors)
    
    const tVisitors = visitors.filter(element => element.date >= lastWeek)
    const tVisitorsUnique = uniqueCount(tVisitors)

    const data = {
        success: true,
        lastWeek: setByDays(lVisitors.map(element => element.date), 7),
        lastWeekUnique: setByDays(lVisitorsUnique.map(element => element.date), 7),
        thisWeek: setByDays(tVisitors.map(element => element.date)),
        thisWeekUnique: setByDays(tVisitorsUnique.map(element => element.date)),
    }
    data.percentage = Math.trunc((data.thisWeekUnique[0] - data.lastWeekUnique[0]) / data.lastWeekUnique[0] * 100)

    res.status(200).send(data)
    
})

//define more routers
router.use('/recipes', require('./recipes/recipesRouter'))
router.use('/weather', require('./weather/weatherRouter'))
router.use('/saturn', require('./saturn/saturnRouter'))

module.exports = router