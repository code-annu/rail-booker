import { prisma } from "../../config/prisma.client";
import stationData from "../data/station.data.json";

type BaseStation = {
  name: string;
  code: string;
  city: string;
  state: string;
};

const stations: BaseStation[] = stationData;

async function main() {
  console.log("Seeding stations:", stations.length);

  await prisma.station.createMany({
    data: stations.map((s) => ({
      ...s,
      country: "India",
      timezone: "Asia/Kolkata",
    })),
    skipDuplicates: true,
  });

  console.log("Stations seeded successfully");
}

main().finally(() => prisma.$disconnect());
