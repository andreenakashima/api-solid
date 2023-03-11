import { Gym, Prisma } from "@prisma/client";

export interface FindByNearbyParams {
  latitude: number;
  longitude: number;
}
export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  findByNearby(params: FindByNearbyParams): Promise<Gym[]>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}
