import { faker } from "@faker-js/faker";
import { prisma } from "../../config/prisma.client";

async function main() {
  const stations = await prisma.station.findMany();
  const trains = await prisma.train.findMany();

  console.log(`Stations: ${stations.length}, Trains: ${trains.length}`);

  const routesData: any[] = [];

  // Group trains by name to find returning pairs
  const pairedTrains: { [name: string]: any[] } = {};
  for (const train of trains) {
    if (!pairedTrains[train.name]) {
      pairedTrains[train.name] = [];
    }
    pairedTrains[train.name]!.push(train);
  }

  for (const name in pairedTrains) {
    const trainGroup = pairedTrains[name];
    // Sort by train number so pairs are adjacent
    trainGroup!.sort((a, b) => parseInt(a.train_number) - parseInt(b.train_number));

    for (let i = 0; i < trainGroup!.length; i += 2) {
      const train1 = trainGroup![i];
      const train2 = trainGroup![i + 1];

      const stopsCount = faker.number.int({ min: 5, max: 20 });

      const shuffledStations = faker.helpers
        .shuffle(stations)
        .slice(0, stopsCount);

      // Generate route for the forward journey
      let distance1 = 0;
      let currentTime1 = new Date();

      shuffledStations.forEach((station: any, index: number) => {
        const travelKm = faker.number.int({ min: 50, max: 300 });

        distance1 += travelKm;

        const arrival = new Date(currentTime1.getTime() + travelKm * 60000); // fake speed logic
        const departure = new Date(arrival.getTime() + 5 * 60000);

        currentTime1 = departure;

        routesData.push({
          train_id: train1.id,
          station_id: station.id,
          stop_order: index + 1,
          arrival_time: arrival,
          departure_time: departure,
          distance_from_source_km: distance1,
        });
      });

      // Generate route for the return journey (if a paired train exists)
      if (train2) {
        let distance2 = 0;
        let currentTime2 = new Date(); // Starting time for return journey

        const reverseStations = [...shuffledStations].reverse();

        reverseStations.forEach((station: any, index: number) => {
          const travelKm = faker.number.int({ min: 50, max: 300 });

          distance2 += travelKm;

          const arrival = new Date(currentTime2.getTime() + travelKm * 60000); // fake speed logic
          const departure = new Date(arrival.getTime() + 5 * 60000);

          currentTime2 = departure;

          routesData.push({
            train_id: train2.id,
            station_id: station.id,
            stop_order: index + 1,
            arrival_time: arrival,
            departure_time: departure,
            distance_from_source_km: distance2,
          });
        });
      }
    }
  }

  console.log("Generated route records:", routesData.length);

  // batch insert (important for performance)
  const chunkSize = 5000;
  for (let i = 0; i < routesData.length; i += chunkSize) {
    await prisma.trainRoute.createMany({
      data: routesData.slice(i, i + chunkSize),
    });
  }

  console.log("Routes seeded successfully");
}

main().finally(() => prisma.$disconnect());
