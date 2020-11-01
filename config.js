let config = {}

module.exports = config

//set default arguments for database connection
config.mongo = {
    name: "Emily",
    collection_forecasts: "Forecasts",
    collection_recipes: "Recipes",
    collection_visitors: "Visitors",
    options: "?authSource=admin",
}

config.psql = {
    name: "saturn",
    table_users: "users"
}