export const checkAdmin = (req, res, next) => {
  const currentUser = req.locals.user;
  if (!currentUser) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }
  if (currentUser.role === "ADMIN") {
    return next();
  }
  return res.status(401).json({ message: "You are not an admin" });
};
