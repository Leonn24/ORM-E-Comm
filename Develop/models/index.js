const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

Product.belongsTo(Category, {
  foreginKey: 'category_id'
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreginKey: 'product_id',
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreginKey: 'tag_id',
});

Category.hasMany(Product, {
  foreginKey: 'category_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
