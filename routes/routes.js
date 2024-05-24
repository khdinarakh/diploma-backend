import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import dormRoutes from "./dorm.routes.js";
import reviewRoutes from "./review.routes.js";
import chatRoutes from "./chat.routes.js";
import postRoutes from "./post.routes.js";

export const setupRoutes = (app) => {
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/dorm", dormRoutes);
  app.use("/review", reviewRoutes);
  app.use("/chat", chatRoutes);
  app.use("/post", postRoutes);
};
