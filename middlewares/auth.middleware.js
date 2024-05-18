import { verifyToken } from "../services/jwt.js";
import { UserRoles } from "../utils/enums.js";

export const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token is missing" });
  }

  const token = authHeader.replace(/^Bearer\s+/, "");

  try {
    const decoded = verifyToken(token);

    if (!decoded.isActivated) {
      return res.status(403).json({ message: "Account is not activated" });
    }

    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const checkIsAdmin = (req, res, next) => {
  if (req.role === UserRoles.ADMIN) {
    next();
  } else {
    res.status(403).json({ message: "No access" });
  }
};
