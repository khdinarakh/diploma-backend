import authRoutes from "./auth.routes.js";

export const setupRoutes = (app) => {
  app.use("/auth", authRoutes);
};
