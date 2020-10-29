const { sortDocumentsBy } = require("./database_mongo")
const { moveTmpFile } = require('./files')
const { collection_recipes } = require('../config').db
const { v4: generateId } = require("uuid")

module.exports = { 

    async setRecipe (data, number) {
        
        let newDoc = {
            number: number,
            name: data.name,
            addedBy: data.addedBy,
            instructions: data.instructions,
            ingredients: data.ingredients,
            dateAdded: new Date() 
        }
        if (data.uuid) {
            newDoc.uuid = data.uuid
            newDoc.path = await moveTmpFile(data.path, data.uuid, "picture")
            newDoc.thumb = await moveTmpFile(data.thumb, data.uuid, "thumb")
        } else {
            newDoc.uuid = generateId()
            newDoc.path = ""
            newDoc.thumb = "/img/noImg.jpg"
        }
        newDoc.link = "/recipes/"+newDoc.uuid

        return newDoc
    }

 }