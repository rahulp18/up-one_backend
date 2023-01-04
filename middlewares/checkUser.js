export const checkUser = (req, res, next) => {
  const currentUser = req.user;
  if (!currentUser) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }
  if (currentUser.role === "SHOP") {
    return next();
  }
  return res.status(401).json({ message: "You are not an SHOP user" });
};
