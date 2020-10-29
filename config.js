let config = {}

module.exports = config

//set default arguments for database connection
config.db = {
    name: "Emily",
    collection_forecasts: "Forecasts",
    collection_recipes: "Recipes",
    collection_visitors: "Visitors",
    url: "localhost:27017",
    options: "?authSource=admin",
    table_users: "users"
}