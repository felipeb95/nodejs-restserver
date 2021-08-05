const jwt = require("jsonwebtoken");

let verificaToken = (req, res, next) => {
  let token = req.get("token");
  jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ ok: false, err: { message: "Token inválido" } });
    }
    req.usuario = decoded.usuario;
    req.id = decoded.id;
    next();
  });
};

let verificaAdminRole = (req, res, next) => {
  let usuario = req.usuario;
  if (usuario.role === "ADMIN_ROLE") {
    next();
  } else {
    res.json({ ok: false, err: { message: "El usuario no es administrador" } });
  }
};

let verificaTokenImg = (req, res, next) => {
  let token = req.query.token;

  jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Token no válido",
        },
      });
    }
    req.usuario = decoded.usuario;
    next();
  });
};

module.exports = {
  verificaToken,
  verificaAdminRole,
  verificaTokenImg
};