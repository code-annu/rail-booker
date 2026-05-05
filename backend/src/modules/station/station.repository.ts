import { injectable } from "inversify";
import { prisma } from "../../config/prisma.client";
import { Station } from "./station.type";
import StationMapper from "./station.mapper";

@injectable()
export default class StationRepository {
  private readonly db;

  constructor() {
    this.db = prisma;
  }

  public findStations = async (
    query: string,
    limit: number = 5,
  ): Promise<Station[]> => {
    const stations = await this.db.station.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { code: { contains: query, mode: "insensitive" } },
        ],
      },
      take: limit,
      orderBy: { name: "asc" },
    });
    // console.log("stations: ", stations);
    return StationMapper.toStationTypes(stations);
  };

  public findStationByCode = async (code: string): Promise<Station | null> => {
    const station = await this.db.station.findUnique({
      where: { code },
    });
    return station ? StationMapper.toStationType(station) : null;
  };

  public findStationById = async (id: string): Promise<Station | null> => {
    const station = await this.db.station.findUnique({
      where: { id },
    });
    return station ? StationMapper.toStationType(station) : null;
  };
}
