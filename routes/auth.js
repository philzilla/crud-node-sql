const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = {
  getLogin: (req, res) => {
    res.render('login')
  },

  postLogin: (req, res) => {
    db.connect(function(err) {
      const email = req.body.email;
      const password = req.body.password;
     // const admin = req.body.admin;

  
      db.query("SELECT * FROM players WHERE email = ? ", email, function(error, results) {
        // console.log("results :", results);
        
        if (results[0].password) {
          bcrypt.compare(password, results[0].password, function(err, result) {
            
          //   console.log('>>>>>> ', password)
          //   console.log('>>>>>> ', results[0].password)

           if(result) {
             jwt.sign( email, process.env.SECRET, (error, token) => {
                res.json({
                  id: email,
                  tokenKey: token
                })
              })
           }  else {
            res.json({
              error: 'Désolé, nous n\'avons pas pu vous identifier 😔'
            });
          }
          })
        }
      });
    });
  }
}

  


