import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import StationRepository from "./station.repository";
import { Station } from "./station.type";
import StationValidator from "../../shared/validator/station.validator";

@injectable()
export default class StationService {
  constructor(
    @inject(TYPES.StationRepository)
    private readonly stationRepo: StationRepository,
    @inject(TYPES.StationValidator)
    private readonly stationValidator: StationValidator,
  ) {}

  public searchStations = async (
    query: string,
    limit?: number,
  ): Promise<Station[]> => {
    if (query.length === 0) return [];
    const stations = await this.stationRepo.findStations(query, limit);
    return stations;
  };

  public getStation = async (id: string): Promise<Station> => {
    return this.stationValidator.ensureStationExistsWithId(id);
  };
}
