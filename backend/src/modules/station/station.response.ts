import { Station } from "./station.type";

export const mapToStationResponse = (
  station: Station,
  statusCode: number,
  message: string,
) => {
  return {
    success: true,
    message,
    statusCode,
    data: station,
  };
};

export const mapToStationsResponse = (
  stations: Station[],
  statusCode: number,
  message: string,
) => {
  return {
    success: true,
    message,
    statusCode,
    data: {
      total: stations.length,
      stations,
    },
  };
};
