<template>
  <q-page class="mt-4 flex flex-col items-center justify-center space-y-4 px-4">
    <div class="uppercase text-justify">
      Bienvenido a la aplicación de viajes. Aquí puedes manejar tus viajes y
      verlos en un calendario. Planifica esos sitios que tanto deseas visitar.
    </div>
    <q-date
      class="!w-full"
      title="Calendario de Viajes"
      v-model="date"
      :events="events"
      @update:model-value="onChange"
    />
    <template v-if="travel">
      <TravelCard :travel="travel" :highlight="travel.id === i" />
    </template>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import travelModel from "src/models/travel";
import moment from "moment";
import TravelCard from "src/components/general/TravelCard.vue";
export default defineComponent({
  name: "IndexPage",
  setup() {
    return {};
  },
  data() {
    return {
      travels: [],
      events: [],
      date: null,
      travel: null,
    };
  },
  methods: {
    async getTravels() {
      const travels = await travelModel.getTravels();
      travels.sort((a, b) => {
        if (a.dueDate === b.dueDate) {
          return a.dueTime > b.dueTime ? 1 : -1;
        }
        return a.dueDate > b.dueDate ? 1 : -1;
      });
      //on each trave, parse dueDate to fomat 'YYYY/MM/DD'
      travels.forEach((travel) => {
        travel.dueDate = moment(travel.dueDate).format("YYYY/MM/DD");
      });
      this.travels = travels;
    },
    onChange(value, reason, details) {
      const travel = this.travels.find((travel) => {
        return travel.dueDate === value;
      });
      this.travel = travel;
    },
  },
  async mounted() {
    await this.getTravels();
    const dates = this.travels.map((travel) => travel.dueDate);
    this.events = dates;
  },
  components: { TravelCard },
});
</script>
