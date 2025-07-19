
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').resolve(__dirname, '..', 'server', '.env') });

const MONGO_URI = process.env.MONGO_URI;

const SinnerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String },
  confession: { type: String }, // Biographie
  favoriteVice: { type: String },
  firstBlasphemy: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const RelationSchema = new mongoose.Schema({
  follower: { type: mongoose.Schema.Types.ObjectId, ref: 'Sinner', required: true },
  followed: { type: mongoose.Schema.Types.ObjectId, ref: 'Sinner', required: true },
  createdAt: { type: Date, default: Date.now }
});

const mainUserEmail = 'luciedefraiteur@gmail.com';
const fakeProfiles = [
  { name: 'Lilith', email: 'lilith@abime.com', password: 'lilith123', avatar: '/src/assets/avatar1.png' },
  { name: 'Baal', email: 'baal@abime.com', password: 'baal123', avatar: '/src/assets/avatar2.png' },
  { name: 'Asmodée', email: 'asmodee@abime.com', password: 'asmodee123', avatar: '/src/assets/avatar3.png' },
  { name: 'Belial', email: 'belial@abime.com', password: 'belial123', avatar: '/src/assets/avatar4.png' },
  { name: 'Astaroth', email: 'astaroth@abime.com', password: 'astaroth123', avatar: '/src/assets/avatar5.png' }
];

async function seed() {
  const connection = await mongoose.createConnection(MONGO_URI).asPromise();
  const Sinner = connection.model('Sinner', SinnerSchema);
  const Relation = connection.model('Relation', RelationSchema);

  try {
    console.log('MongoDB connection successful!');

    const mainUser = await Sinner.findOne({ email: mainUserEmail });
    if (!mainUser) {
      console.error('Utilisateur principal non trouvé:', mainUserEmail);
      process.exit(1);
    }

    for (const fake of fakeProfiles) {
      let sinner = await Sinner.findOne({ email: fake.email });
      if (!sinner) {
        const hash = await bcrypt.hash(fake.password, 10);
        sinner = await Sinner.create({ name: fake.name, email: fake.email, password: hash, avatar: fake.avatar });
        console.log('Créé:', fake.name);
      }
      // Ajoute comme "enchaîné" (ami suivi)
      await Relation.updateOne(
        { follower: mainUser._id, followed: sinner._id },
        { $setOnInsert: { follower: mainUser._id, followed: sinner._id } },
        { upsert: true }
      );
      // Ajoute comme "corrompu" (ami qui suit l'utilisateur principal)
      await Relation.updateOne(
        { follower: sinner._id, followed: mainUser._id },
        { $setOnInsert: { follower: sinner._id, followed: mainUser._id } },
        { upsert: true }
      );
    }
    console.log('Profils fictifs et relations ajoutés.');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await connection.close();
    console.log('MongoDB connection closed.');
  }
}

seed();
