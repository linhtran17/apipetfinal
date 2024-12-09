const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require("../config")

// Middleware để xác minh token
const verifyToken = (req, res, next) => {
  // Lấy token từ header hoặc query hoặc body
  const token = req.headers['authorization'] || req.query.token || req.body.token;

  // Kiểm tra xem token có tồn tại không
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  // Loại bỏ 'Bearer ' nếu có
  const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

  // Xác minh token
  jwt.verify(actualToken, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    
    req.user = decoded;
    next(); // Tiếp tục xử lý request
  });
};

module.exports = verifyToken;
