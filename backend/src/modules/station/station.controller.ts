import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import TYPES from "../../di/inversify.types";
import StationService from "./station.service";
import {
  mapToStationResponse,
  mapToStationsResponse,
} from "./station.response";
import catchAsync from "../../shared/error/async.catch";

@injectable()
export default class StationController {
  constructor(
    @inject(TYPES.StationService)
    private readonly stationService: StationService,
  ) {}

  public searchStations = catchAsync(async (req: Request, res: Response) => {
    const query = (req.query.q as string) || "";
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : undefined;
    const stations = await this.stationService.searchStations(query, limit);
    const response = mapToStationsResponse(
      stations,
      200,
      "Stations fetched successfully",
    );
    res.status(200).json(response);
  });

  public getStationById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const station = await this.stationService.getStation(id);
    const response = mapToStationResponse(
      station,
      200,
      "Station fetched successfully",
    );
    res.status(200).json(response);
  });
}
