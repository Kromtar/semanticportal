const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  rut: { type: String, unique: true },
  name: String,
  surname: String,
  age: Number,
  gender: String,
  mail: String,
  interest: [String],
  password: String
});

userSchema.methods.generateHash = function (password) {
  //TODO: Revisar ciclo de 8 en bcrypt
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('users', userSchema);
