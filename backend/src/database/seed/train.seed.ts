import { prisma } from "../../config/prisma.client";
import trainData from "../data/train.data.json";

type TrainInput = {
  name: string;
  train_number: string;
  train_type: string;
};

const trains: TrainInput[] = trainData;

async function main() {
  console.log("Seeding trains:", trains.length);

  await prisma.train.createMany({
    data: trains.map((t) => ({
      ...t,
      is_active: true,
    })),
    skipDuplicates: true,
  });

  console.log("Trains seeded successfully");
}

main().finally(() => prisma.$disconnect());
