require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./models/person');

// Connexion
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Créer une personne
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

// Créer plusieurs personnes
const createManyPeople = () => {
  const arrayOfPeople = [
    { name: "mai", age: 30, favoriteFoods: ["Burger"] },
    { name: "pape", age: 22, favoriteFoods: ["Fries", "Burritos"] },
    { name: "niang", age: 27, favoriteFoods: ["Salad"] }
  ];

  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    console.log("✅ People created:", people);
  });
};

// Trouver par nom
// Recherche toutes les personnes avec un nom donné
const findPeopleByName = (personName) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    console.log("✅ People found:", data);
  });
};

// Trouver une personne avec un aliment préféré
// Recherche une personne dont un aliment préféré correspond à la valeur donnée
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    console.log("✅ One person found with food:", data);
  });
};

// Trouver par ID
// Recherche une personne par son identifiant unique
const findPersonById = (personId) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    console.log("✅ Person found by ID:", data);
  });
};

// Modifier une personne puis enregistrer
// Ajoute "hamburger" aux aliments préférés d'une personne et sauvegarde
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

// Mettre à jour l’âge
// Met à jour l'âge d'une personne trouvée par son nom à 20 ans
const updateAge = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updated) => {
      if (err) return console.error(err);
      console.log("✅ Age updated:", updated);
    }
  );
};

// Supprimer par ID
// Supprime une personne par son identifiant unique
const deleteById = (personId) => {
  Person.findByIdAndRemove(personId, (err, removed) => {
    if (err) return console.error(err);
    console.log("✅ Person removed:", removed);
  });
};

// Supprimer plusieurs
// Supprime toutes les personnes portant le nom "Mary"
const deleteManyMary = () => {
  Person.deleteMany({ name: "Mary" }, (err, result) => {
    if (err) return console.error(err);
    console.log("✅ Marys deleted:", result);
  });
};

// Recherche complexe
// Recherche les personnes qui aiment les "Burritos", trie par nom, limite à 2 résultats et exclut l'âge
const chainSearch = () => {
  Person.find({ favoriteFoods: "Burritos" })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log("✅ Chained result:", data);
    });
};

// Appelle une fonction pour tester
createAndSavePerson();
// createManyPeople();
// findPeopleByName("Mary");
// findOneByFood("Fries");
// findPersonById("64f..."); // Remplace par ID
// findEditThenSave("64f..."); // Remplace par ID
// updateAge("Steve");
// deleteById("64f...");
// deleteManyMary();
// chainSearch();

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