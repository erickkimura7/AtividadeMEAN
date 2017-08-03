var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');

var User = require('../models/user.js');
var Contato = require('../models/contatos.js');


router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/contato', function(req, res, next) {
  Contato.find({usuario:req.user.username},function (err, contatos) {
    if (err) return next(err);
    res.json(contatos);
  });
});

router.post('/contato', function(req, res, next) {
  Contato.create({ usuario:req.user.username, nome: req.body.nome, endereco: req.body.endereco, telfixo: req.body.telfixo, telmovel: req.body.telmovel, email: req.body.email, obs: req.body.obs }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/contato:id', function(req, res, next) {
  Contato.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.put('/contato:id', function(req, res, next) {
  Contato.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});

module.exports = router;