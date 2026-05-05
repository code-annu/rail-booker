import { Station as PrismaStation } from "../../generated/prisma";
import { Station } from "./station.type";

export default abstract class StationMapper {
  public static toStationType = (station: PrismaStation): Station => {
    return {
      id: station.id,
      code: station.code,
      name: station.name,
      city: station.city,
      state: station.state,
      country: station.country,
      timezone: station.timezone,
      createdAt: station.created_at,
      updatedAt: station.updated_at,
    };
  };

  public static toStationTypes = (stations: PrismaStation[]): Station[] => {
    return stations.map((station) => this.toStationType(station));
  };
}
