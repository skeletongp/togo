import { db } from "../boot/db";

export default {
  async getTravels() {
    return await db.travels.toArray();
  },

  async getTravel(id) {
    return await db.travels.get(id);
  },

  async addTravel(travel) {
    travel.center = `${travel.center.lat},${travel.center.lng}`;
    console.log(travel);
    const id = new Date().getTime();
    travel.id = id;
    return await db.travels.add(travel);
  },

  async updateTravel(travel) {
    return await db.travels.update(travel.id, travel);
  },

  async deleteTravel(id) {
    return await db.travels.delete(id);
  },
};
