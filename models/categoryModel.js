const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
}, { timestamps: true });

categorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Category', categorySchema);