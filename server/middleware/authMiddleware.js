const jwt = require("jsonwebtoken");
const db = require("../database");

// const requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   // check json web token exists & is verified
//   if (token) {
//     jwt.verify(token, 'testing', (err, decodedToken) => {
//       if (err) {
//         console.log(err.message);
//         res.redirect('/login');
//       } else {
//         console.log(decodedToken);
//         next();
//       }
//     });
//   } else {
//     res.redirect('/login');
//   }
// };

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "testing", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = db.getUserById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {
  // requireAuth,
  checkUser,
};
