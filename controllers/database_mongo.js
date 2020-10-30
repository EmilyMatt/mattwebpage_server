const {MongoClient} = require("mongodb");
const config = require('../config').db
const fs = require('fs')

const {
    DB_ADMIN,
    DB_PASS
} = process.env;

//this is the client that connects to the database
const conn = new MongoClient(`mongodb://${DB_ADMIN}:${DB_PASS}@${config.url}/${config.options}`, {useUnifiedTopology: true})

//this function simply verifies that the client is connected to the db, if not - it connects
const getDbo = async (name = config.name) => {

    if(!conn.isConnected())
        await conn.connect()

    return conn.db(name)

}

//this function returns a specific collection from the database
const getCollection = async (collectionName) => {

    const dbo = await getDbo()
    return dbo.collection(collectionName)
}

//returns a document from the database
const getOne = async (collectionName, params) => {

    const collection = await getCollection(collectionName)
    const document = await collection.findOne(params)

    //if no document matched send back error
    if (document == null)
        return false

    return document
}

//returns a set of documents
const getMany = async (collectionName, params) => {

    const collection = await getCollection(collectionName)
        .catch(() => false)
    if (!collection)
        return false

    const document = await collection.find(params).toArray()
        .catch(() => false)
    if (!document)
        return false

    return document
}

//this function adds or edits a specified document to a specified collection
const addOne = async (collectionName, data) => {

    //get collection
    const collection = await getCollection(collectionName)
        .catch(() => false)
    //if error, throw it back
    if (!collection)
        return collection

    if (data.categoryId)
        data.categoryId = ObjectId(data.categoryId)

    //insert the document
    const document = await collection.insertOne(data)
        .catch(() => false)
    //if error, throw it back
    if (!document)
        return document

    //if all succeeded, send back the information that was stored in db for verification
    return document.ops[0]
}

//this function adds or edits a specified document to a specified collection
const addMany = async (collectionName, data) => {

    //get collection
    const collection = await getCollection(collectionName)
        .catch(() => false)
    //if error, throw it back
    if (!collection)
        return collection

    //insert the document
    const document = await collection.insertMany(data)
        .catch(() => false)
    //if error, throw it back
    if (!document)
        return document

    //if all succeeded, send back the information that was stored in db for verification
    return document.ops[0]
}

const updateOne = async (collectionName, filter, data) => {

    //get collection
    const collection = await getCollection(collectionName)
        .catch(() => false)
    //if error, throw it back
    if (!collection)
        return collection

    if (data.categoryId)
        data.categoryId = ObjectId(data.categoryId)
    //insert the document
    const document = await collection.findOneAndUpdate(filter, { $set: data })
        .catch((err) => console.log(err))

    //if error, throw it back
    if (!document)
        return document

    //if all succeeded, send back the information that was stored in db for verification
    return document.value
}

const deleteOne = async (collectionName, data) => {

    //get collection
    const collection = await getCollection(collectionName)
        .catch(() => false)
    //if error, throw it back
    if (!collection)
        return collection

    const params = {
        deleted: data.action
    }

    //if action is to delete - set active to false also
    if (data.action)
        params.active = false

    //insert the document
    const document = await collection.findOneAndUpdate({ _id: ObjectId(data.id) }, { $set: params })
        .catch(() => false)

    //throw back success or error
    return document
}

//this method sorts the specified collection by a specified parameter
//useful for example to get the last document inserted or sort alphabetically etc.
const sortDocumentsBy = (documents, param) => {

    //sort the array according to the parameter
    return documents.sort((a, b) =>
        a[param] > b[param]
            ? -1
            : 1
    )
}

const cleanDatabase = async () => {

    const collection = await getCollection(collection_recipes)
    await collection.drop()
    fs.rmdirSync('../public/tmp', { recursive: true })
    fs.rmdirSync('../public/img/recipes', { recursive: true })
    addMany(config.collection_recipes, JSON.parse(require('../jsons/defaultR')))
}

module.exports = {
    getCollection,
    getOne,
    getMany,
    addOne,
    updateOne,
    deleteOne,
    sortDocumentsBy,
    cleanDatabase
}

