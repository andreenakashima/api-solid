import { prisma } from "@/lib/prisma";
import { Gym, Prisma } from "@prisma/client";
import { FindByNearbyParams, GymsRepository } from "../gyms-repository";

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = prisma.gym.findUnique({
      where: { id },
    });

    return gym;
  }

  async findByNearby({ latitude, longitude }: FindByNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }

  async searchMany(query: string, page: number) {
    const gyms = prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = prisma.gym.create({
      data,
    });

    return gym;
  }
}
