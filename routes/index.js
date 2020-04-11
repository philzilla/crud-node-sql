module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `players` ORDER BY id ASC"; // Listes des joueurs
        
        db.query(query, (err, result) => {
            
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Equipe de FRance"
                ,players: result
            });
        });
    },
};