const router = require('express').Router()
const { collection_forecasts } = require('../../config').mongo
const { imsAPI_15cities } = require('../../controllers/forecast_api')
const { getMany, sortDocumentsBy } = require('../../controllers/database_mongo')
const { MAP_KEY } = process.env

router.get('/refreshForecast', async (req, res) => {
    await imsAPI_15cities()
})

router.get("/getForecast", async (req, res) => {

    //get all forecasts in collection
    let forecasts = await getMany(collection_forecasts, {})
    if (!forecasts || forecasts.length == 0)
        return res.status(200).send({ success: false })

    forecasts = sortDocumentsBy(forecasts, "date")
        
    res.status(200)
        .send({ success: true, key: MAP_KEY, forecast: forecasts[0] })
})

module.exports = router
