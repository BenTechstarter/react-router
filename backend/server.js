app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect('http://localhost:3000/myspace');
  }
);

app.get("/userData", (req, res) => {
    // Überprüfen, ob der Nutzer eingeloggt ist
    if (req.isAuthenticated()) {
      // req.user sollte das Nutzerobjekt aus der Deserialisierung enthalten
      const userId = req.user.id;
  
      db.get("SELECT id, username, name FROM users WHERE id = ?", [userId], (err, row) => {
        if (err) {
          console.error("Fehler beim Abrufen der Nutzerdaten:", err);
          res.status(500).send("Interner Serverfehler");
        } else if (row) {
          res.json(row); // Sendet die Nutzerdaten als JSON-Response
        } else {
          res.status(404).send("Nutzer nicht gefunden");
        }
      });
    } else {
      // Wenn der Nutzer nicht eingeloggt ist, sende eine entsprechende Antwort
      res.status(403).send("Nicht autorisiert");
    }
  });
  