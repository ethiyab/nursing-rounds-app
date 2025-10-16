const jwt = require('jsonwebtoken');

function auth(requiredRole) {
  return function(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "يجب تسجيل الدخول" });
    const token = header.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, "SECRET_KEY");
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: "ليس لديك صلاحية" });
      }
      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({ error: "توكن غير صالح" });
    }
  }
}

module.exports = auth;