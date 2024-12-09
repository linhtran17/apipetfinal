const checkRole = (roles) => {
  return (req, res, next) => {
    // Kiểm tra nếu role đã được lưu trong req.user (sau khi verify token)
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'Access denied. No role found.' });
    }

    // Kiểm tra vai trò người dùng có khớp với vai trò yêu cầu không
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    // Nếu vai trò hợp lệ, tiếp tục xử lý
    next();
  };
};

module.exports = checkRole;
