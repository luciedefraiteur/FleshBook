# Plan des Modèles Backend pour FleshBook

## ✴️ Cercle

```js
const CercleSchema = new mongoose.Schema({
  nom: String,
  actif: Boolean,
  utilisateurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sinner' }],
});

module.exports = mongoose.model('Cercle', CercleSchema);
```

---

## ✴️ Offrande

```js
const OffrandeSchema = new mongoose.Schema({
  contenu: String,
  date: { type: Date, default: Date.now },
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Sinner' },
  cercle: { type: mongoose.Schema.Types.ObjectId, ref: 'Cercle' },
  type: { type: String, enum: ['offrande', 'rituel', 'confession', 'appel'], default: 'offrande' },
});

module.exports = mongoose.model('Offrande', OffrandeSchema);
```

---

## ✴️ Écho

```js
const EchoSchema = new mongoose.Schema({
  contenu: String,
  date: { type: Date, default: Date.now },
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Sinner' },
  offrande: { type: mongoose.Schema.Types.ObjectId, ref: 'Offrande' },
});

module.exports = mongoose.model('Echo', EchoSchema);
```

---

## ✴️ Sinner

```js
const SinnerSchema = new mongoose.Schema({
  nom: String,
  email: String,
  password: String,
  cercles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cercle' }],
  offrandes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offrande' }],
  echos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Echo' }],
});

module.exports = mongoose.model('Sinner', SinnerSchema);
```

---

**FleshBook :: Modèles sacrés pour une base de données vivante.**
