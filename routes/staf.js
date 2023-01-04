import express from "express";

const routes = express.Router();

routes.post("/", addStaf);
routes.put("/:id", updateStaf);
routes.delete("/:id", deleteStaf);
routes.get("/:id", getSingleStaf);
routes.get("/", getAllStaf);

export default routes;
