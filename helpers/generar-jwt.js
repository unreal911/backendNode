var jwt = require("jsonwebtoken");
const generarJWT = (id) => {
  const payload = { id };
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JSONWEBTOKEN,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          reject(err);
          console.log("no se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
module.exports = {
  generarJWT,
};
