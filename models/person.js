// models/person.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Création du schéma
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Exportation du modèle
module.exports = mongoose.model('Person', personSchema);
