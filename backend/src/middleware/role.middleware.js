export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied: Unauthorized Role" });
    }
    next();
  };
};


// Review this code again while using !!