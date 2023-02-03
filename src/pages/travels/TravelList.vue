<template>
  <q-page class="p-2 relative">
    <div class="text-center font-bold uppercase py-2 bg-white sticky top-4">
      Viajes Registrados
    </div>
    <div class="flex flex-row justify-between">
      <q-input label="Buscar " class="w-full" dense v-model="search" />
    </div>
    <div class="flex flex-col space-y-2 pt-4" :key="travels">
      <template v-if="travels.length > 0">
        <template v-for="travel in travels" :key="travel.id">
          <TravelCard
            :travel="travel"
            :highlight="travel.id === id"
          /> </template
      ></template>
      <template v-else>
        <a-empty />
      </template>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import travelModel from "src/models/travel";
import TravelCard from "src/components/general/TravelCard.vue";
export default defineComponent({
  name: "TravelList",

  components: { TravelCard },

  setup() {
    return {};
  },
  data() {
    return {
      travels: [],
      allTravels: [],
      id: null,
      search: null,
    };
  },
  methods: {
    async getTravels() {
      const travels = await travelModel.getTravels();
      //sort travels by dueDate and then by dueTime
      travels.sort((a, b) => {
        if (a.dueDate === b.dueDate) {
          return a.dueTime > b.dueTime ? 1 : -1;
        }
        return a.dueDate > b.dueDate ? 1 : -1;
      });
      this.travels = travels;
      this.allTravels = travels;
    },
  },

  mounted() {
    this.getTravels();
    //if exist param id

    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    }
  },

  watch: {
    search: function (val) {
      if (val) {
        this.travels = this.allTravels.filter((travel) => {
          return (
            travel.title.toLowerCase().includes(val.toLowerCase()) ||
            travel.description.toLowerCase().includes(val.toLowerCase()) ||
            travel.location.toLowerCase().includes(val.toLowerCase())
          );
        });
      } else {
        this.travels = this.allTravels;
      }
      this.$forceUpdate();
    },
  },
});
</script>
