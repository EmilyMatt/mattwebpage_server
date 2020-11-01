const { parseStringPromise } = require('xml2js')
const axios = require('axios')
const iconv = require('iconv-lite')
const fs = require('fs')
const { addOne } = require('./database_mongo')
const { collection_forecasts } = require('../config').mongo

const imsAPI_15cities = async () => {

    return await axios({
        url: "https://ims.data.gov.il/sites/default/files/isr_cities.xml",
        method: "GET",
        responseType: "arraybuffer",
        headers: {
            'content-type': 'text/xml'
        }
    })
        .then(async res => {
            return await responseOk(res)
        })
        .catch( err => {
            return { status: 500, err: "Could not recieve data"}  
        })
    
}

const responseOk = async (res) => {

    //ims using ancient encoding, so in order to get unicode hebrew chars we need to decode it first
    const decoded = iconv.decode(res.data, "ISO-8859-8")
    let parsedResponse = await parseStringPromise(decoded)

    //check wethear the latest forecast is evening or morning
    const json = (parsedResponse.hasOwnProperty("IsraelCitiesWeatherForecastEvening") ? 
        parsedResponse.IsraelCitiesWeatherForecastEvening.Location : 
        parsedResponse.IsraelCitiesWeatherForecastMorning.Location)

    //sort the json
    const sorted = sortJSON(json)
    return await addOne(collection_forecasts, { date: Date.now(), data: sorted })
}

const sortJSON = (data) => {

    let json = {}
    data.forEach( location => {

        //create temporary object
        const tmp = {}

        //register city name in object
        tmp.cityNameEng = location.LocationMetaData[0].LocationNameEng[0]
        tmp.cityNameHeb = location.LocationMetaData[0].LocationNameHeb[0]
        tmp.cityId = location.LocationMetaData[0].LocationId[0]
        tmp.displayLat = location.LocationMetaData[0].DisplayLat[0]
        tmp.displayLng = location.LocationMetaData[0].DisplayLon[0]

        //forecasts array for next days
        tmp.forecasts = []

        //register each forecast to object
        location.LocationData[0].TimeUnitData.forEach( forecast => {

            const subtmp = {}
            subtmp.date = new Date(forecast.Date[0])

            //check which variable am i getting
            forecast.Element.forEach(checkVar => {
                subtmp[getVarName(checkVar)] = checkVar.ElementValue[0]
            })

            //push temporary forecast data into temporary object
            tmp.forecasts.push(subtmp)

        })

        //push temporary object into data array
        json[tmp.cityId] = tmp

    })
    return json
}

const getVarName = (checkVar) => {

    switch(checkVar.ElementName[0]) {
        case "Minimum temperature":
            return "minTemp"
            break
        case "Maximum temperature": 
            return "maxTemp"
            break
        case "Minimum relative humidity": 
            return "humidity"
            break
        case "Maximum relative humidity": 
            return "humidity"
            break
        case "Wind direction and speed": 
            return "wind"
            break
        case "Weather code": 
            return "wCode"
            break
    }
    
}

module.exports = { imsAPI_15cities }