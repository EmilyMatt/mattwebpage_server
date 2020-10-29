const { Client } = require('pg')
let psqlClient

const connectpsql = () => {
    client = new Client({
        user: 'saturn',
        password: '1234',
        host: 'localhost',
        database: 'saturn',
        port: 5432,
    })

    psqlClient = client.connect()
}

const parseToParenthesis = (string, keys, quotes) => {
    if (keys.length > 0)
    {
        if (keys.length > 1)
        {
            string += "("
            keys.forEach((element, idx) =>
            {
                if (quotes)
                    string += `'${element}'`
                else
                    string += element

                if (idx != keys.length - 1)
                    string += ", "
            })
            string += ")"
        }
        else
            string += keys[0]

        return string + " "
    }
    else
        return string
}

const parseToParenthesis2 = (string, objKeys, objVals) => {
    if (objKeys.length > 0) {
        string += "WHERE "
        if (objKeys.length > 1) {
            string += "("
            objKeys.forEach((element, idx) => {
                string += `${element}='${objVals[idx]}'`
                if (idx != objKeys.length - 1)
                    string += "AND "
            })
            string += `)`
        } else
            string += `${objKeys[0]}='${objVals[0]}'`
        return string + " "
    }
    else
        return string
}

const parseToParenthesis3 = (string, objKeys, objVals) => {
    if (objKeys.length > 0) {
        if (objKeys.length > 1) {
            objKeys.forEach((element, idx) => {
                string += `${element} = '${objVals[idx]}'`
                if (idx != objKeys.length - 1)
                    string += ", "
            })
        } else
            string += `${objKeys[0]} = '${objVals[0]}'`
        return string + " "
    }
    else
        return string
}

const insertOne = async (table, keys, values) => {

    let string = `INSERT INTO ${table} `
    string = parseToParenthesis(string, keys, false)
    if (!string)
        return false

    string += "VALUES "
    string = parseToParenthesis(string, values, true)
    if (!string)
        return false
        
    return await client.query(string)
}

const selectMany = async (table, columns, params) => {

    let string = "SELECT "
    string = parseToParenthesis(string, columns, false)
    if (!string)
        return false

    string += `FROM ${table} `

    const objKeys = Object.keys(params)
    const objVals = Object.values(params)
    string = parseToParenthesis2(string, objKeys, objVals)
    if (!string)
        return false

    return await client.query(string)
}

const updateOne = async (table, newVals, params) => {

    let string = "UPDATE " + table
    string += " SET "
    let objKeys = Object.keys(newVals)
    let objVals = Object.values(newVals)
    string = parseToParenthesis3(string, objKeys, objVals)
    if (!string)
        return false

    objKeys = Object.keys(params)
    objVals = Object.values(params)
    string = parseToParenthesis2(string, objKeys, objVals)
    if (!string)
        return false

    console.log(string)
    return await client.query(string)
}

const psql = () => {
    return client
}


module.exports = {
    connectpsql,
    psql,
    insertOne,
    updateOne,
    selectMany
}