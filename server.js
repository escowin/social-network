const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('./routes'));

// connects mongoose to db when app starts. mongodb will connect to the existing db or create one if it doesn't exist.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// logs executed mongo queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on http://localhost:${PORT}`));