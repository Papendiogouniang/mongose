// server.js
require('dotenv').config();
const mongoose = require('mongoose');

// Connexion à MongoDB avec Mongoose
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Import du modèle
const Person = require('./models/person');

// À partir d’ici, tu peux appeler les fonctions pour tester tes opérations...
const createAndSavePerson = () => {
  const person = new Person({
    name: "pape ndiogou",
    age: 25,
    favoriteFoods: ["Pizza", "Pasta"]
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    console.log("✅ Person saved:", data);
  });
};

// createAndSavePerson();
const createManyPeople = () => {
  const arrayOfPeople = [
    { name: "Mary", age: 30, favoriteFoods: ["Burger"] },
    { name: "Steve", age: 22, favoriteFoods: ["Fries", "Burritos"] },
    { name: "Alice", age: 27, favoriteFoods: ["Salad"] }
  ];

  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    console.log("✅ People created:", people);
  });
};

// createManyPeople();
const findPeopleByName = (personName) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    console.log("✅ People found:", data);
  });
};

// findPeopleByName("Mary");
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    console.log("✅ One person found with food:", data);
  });
};

// findOneByFood("Fries");
const findPersonById = (personId) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    console.log("✅ Person found by ID:", data);
  });
};
const findEditThenSave = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push("hamburger");
    person.save((err, updated) => {
      if (err) return console.error(err);
      console.log("✅ Updated person:", updated);
    });
  });
};


// findEditThenSave("64f..."); // Remplace par un ID réel
const updateAge = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true }, // retourne le document mis à jour
    (err, updated) => {
      if (err) return console.error(err);
      console.log("✅ Age updated:", updated);
    }
  );
};

// updateAge("Steve");
const deleteById = (personId) => {
  Person.findByIdAndRemove(personId, (err, removed) => {
    if (err) return console.error(err);
    console.log("✅ Person removed:", removed);
  });
};

// deleteById("64f..."); // Remplace par un ID réel
const deleteManyMary = () => {
  Person.deleteMany({ name: "Mary" }, (err, result) => {
    if (err) return console.error(err);
    console.log("✅ Marys deleted:", result);
  });
};

// deleteManyMary();
const chainSearch = () => {
  Person.find({ favoriteFoods: "burritos" })
    .sort("name") // trier par nom
    .limit(2) // limiter à 2 documents
    .select("-age") // ne pas afficher l'âge
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log("✅ Chained result:", data);
    });
};

// chainSearch();

// chainSearch();

// Export functions to avoid "declared but its value is never read" warnings
module.exports = {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  updateAge,
  deleteById,
  deleteManyMary,
  chainSearch
};
