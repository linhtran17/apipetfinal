const Product = require("./product")
const CatPet = require("./CategoryPets")
const CatPro = require("./CategoryProducts")


CatPet.hasMany(Product, {
    foreignKey: "cat_pet",
    as: "products"
})
CatPro.hasMany(Product, {
    foreignKey: "cat_pro",
    as: "products"
})

Product.belongsTo(CatPet, {
    foreignKey: "cat_pet",
    as: "CategoryPets"
})