import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import StationRepository from "../../modules/station/station.repository";
import { Station } from "../../modules/station/station.type";
import { NotFoundError } from "../error/errors";
import ErrorCode from "../error/ErrorCodes";

@injectable()
export default class StationValidator {
  constructor(
    @inject(TYPES.StationRepository)
    private readonly stationRepo: StationRepository,
  ) {}

  public ensureStationExistsWithId = async (id: string): Promise<Station> => {
    const station = await this.stationRepo.findStationById(id);
    if (!station)
      throw new NotFoundError(
        ErrorCode.RESOURCE_NOT_FOUND,
        `Station not found with Id: ${id}`,
      );
    return station;
  };

  public ensureStationExistsWithCode = async (
    code: string,
  ): Promise<Station> => {
    const station = await this.stationRepo.findStationByCode(code);
    if (!station)
      throw new NotFoundError(
        ErrorCode.STATION_NOT_FOUND,
        `Station not found with code: ${code}`,
      );
    return station;
  };
}
