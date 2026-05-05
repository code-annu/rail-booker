import { Router } from "express";
import TYPES from "../../di/inversify.types";
import StationController from "./station.controller";
import container from "../../di/inversify.config";

const stationRouter = Router();

const stationController = container.get<StationController>(
  TYPES.StationController,
);

stationRouter.get("/search", stationController.searchStations);

stationRouter.get("/:id", stationController.getStationById);

export default stationRouter;
