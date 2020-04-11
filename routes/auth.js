const bcrypt = require("bcrypt");
const jwtUtils = require('../utils/jwt.utils')


module.exports = {
  getLogin: (req, res) => {
    res.render('login')
  },


  postLogin: (req, res) => {
    db.connect(function(err) {
      let email = req.body.email;
      let password = req.body.password;
  
      db.query("SELECT * FROM players WHERE email = ? ", [req.body.email], function(error, results) {
        // console.log("results :", results);
        
        if (results[0].password) {
          bcrypt.compare(req.body.password, results[0].password, function(err, result) {
           console.log('>>>>>> ', password)
           console.log('>>>>>> ', results[0].password)
           if(result) {
             res.json( {
              players: results[0],
              'token': jwtUtils.generateTokenForUser(results[0].id)
             }
             
             )
             /*
            return res.status(200).json({
              'id': results[0].id,
              'firstname': results[0].id,
            //  'token': jwtUtils.generateTokenForUser(user)
            */
            
           }
           else {
             return res.status(400).send();
           }
         })
        }
      });
    });
  }
    /*
    let players = "SELECT password FROM `players`" ;

    db.query(players, (err, result) => {
            console.log("result :", result[0].password);
            
      if (err) {
          res.redirect('/');
      }
      bcrypt.compare(req.body.password, result.password, function (err, result) {
        if (result) {
            return res.status(200).json({
              'id': user.id,
            //  'token': jwtUtils.generateTokenForUser(user)
            })
        } else {
         return res.status(403).json({'error':'invalid password'})
        }
      });

      
  })
  
  ;
     
}
*/
/*

    db.query.findOne({where: {email: req.body.email}})
      .then(function (user) {
        if(!user) {
            res.redirect('/')
        } else {
          bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (result) {
                return res.status(200).json({
                  'id': user.id,
                  'token': jwtUtils.generateTokenForUser(user)
                })
            } else {
             return res.status(403).json({'error':'invalid password'})
            }
          });
        }
      })
     
  */



    /*
    db
    .query
    
    .findOne({
      where: {email: email}
    })
    
    .exec((user) => {
      
        if(!user) {
          res.redirect('/', {'message': 'erreur contenu'})
        } else {
          bcrypt.compare(password, user.password, function (err, result) {
            if (result == true) {
                res.redirect('/');
            } else {
             res.send('Incorrect password');
             res.redirect('/');
            }
          });
        }
    })
    */
  }


