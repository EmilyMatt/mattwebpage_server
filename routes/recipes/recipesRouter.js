const router = require('express').Router()
const { getMany, sortDocumentsBy, addOne, getOne, updateOne } = require('../../controllers/database_mongo')
const { v4: generateId } = require('uuid')
const { collection_recipes } = require('../../config').mongo
const { uploadImg } = require('../../controllers/files')
const { setRecipe } = require('../../controllers/recipes_api')

router.get('/getRecipe/:id', async (req, res) => {
    const recipe = await getOne(collection_recipes, { uuid: req.params.id })
    if (!recipe)
        return res.status(200).send(false)

    let views = recipe.views
    if (!views)
        views = 0
    updateOne(collection_recipes, { uuid: req.params.id }, { views: views + 1 } )
    res.status(200).send(recipe)
})

router.get('/getRecipes', async (req,res) => {

    const sendErr = (msg) => {
        res.status(200).send(msg)
    }
    //get all recipes in collection
    const recipes = await getMany(collection_recipes, {})
    
    //if recipes collection is not available, send error
    if (!recipes)
        return sendErr("Could not retrieve documents")
    
    //if array is empty in production, send error, if in development, send fake data
    if (recipes.length == 0)
        return sendErr("No documents to show")

    //sort recipes by index
    const sorted = sortDocumentsBy(recipes, "number")

    //turn date in each recipe to readable format
    sorted.forEach( element => {
        element.dateAdded = element.dateAdded.toLocaleDateString()
    })

    //send back recipes
    res.status(200).send({ success: true, data: sorted })
})

router.post('/uploadImg', async (req, res) => {

    const sendErr = (msg) => {
        res.status(200).send(msg)
    }

    const recipes = await getMany(collection_recipes, {})

    if (!recipes)
        return sendErr("Could not connect to database")

    if (recipes.length > 99)
        return sendErr("Too many recipes")

    const uuid = generateId()
    const info = await uploadImg('./public/files/tmp/img/', uuid, req)

    if (!info.uploaded)
        return res.status(500).json({ err: info.err })

    res.status(200).json({ 
        uploaded: true, 
        uuid: uuid, 
        path: info.path.replace("public", ''),
        thumb: info.thumb.replace("public", '') 
    })

})

router.post('/postRecipe', async (req, res) => {

    const sendErr = (msg) => {
        res.status(200).send(msg)
    }

    let recipes = await getMany(collection_recipes, {})
    if (!recipes)
        return sendErr("Could not connect to database.")
    else if (recipes.length > 99)
        return sendErr("Too many recipes.")

    recipes = sortDocumentsBy(recipes, "number")

    const number = (recipes.length > 0 
        ? recipes[0].number+1 
        : 1)
        
    const newDoc = await setRecipe(req.body, number)
    const document = await addOne(collection_recipes, newDoc)

    if (!document)
        sendErr("Internal server error")

    res.status(200).send({ success: true })
})

module.exports = router