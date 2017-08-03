// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contato = new Schema({
  usuario:String,
  nome: String,
  endereco: String,
  telfixo: String,
  telmovel: String,
  email: String,
  obs: String
});

module.exports = mongoose.model('contatos', Contato);
