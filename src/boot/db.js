import { boot } from "quasar/wrappers";
import Dexie from "dexie";

const db = new Dexie("storage");

db.version(1).stores({
  travels: "++id",
});

const travels = async () => {
  const travel = await db.travels.toArray();
  console.log(travel);
};

travels();
export default boot(({ app }) => {
  app.config.globalProperties.$db = db;
});

export { db };
