const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: false },
  image: { type: String, required: true },
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);