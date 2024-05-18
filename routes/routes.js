import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";

export const setupRoutes = (app) => {
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
};
