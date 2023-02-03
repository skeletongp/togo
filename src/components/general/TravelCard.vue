<template>
  <q-card
    class="py-2 !w-full"
    color="primary"
    :class="highlight ? 'border-2 border-sky-200' : ''"
  >
    <q-card-section horizontal class="items-center">
      <q-avatar size="35px">
        <q-icon @click="showMap = true" class="ri-map-pin-line"></q-icon>
        <q-dialog v-model="showMap">
          <GoogleMap
            api-key="AIzaSyAd55TaJNRJIDp8k9wAwT1Rmu8HJUEJCfQ"
            style="
              width: 100%;
              height: 240px;
              margin-top: 2rem;
              margin-bottom: 2rem;
            "
            :center="center"
            :zoom="13"
          >
            <CustomMarker
              :options="{ position: center, anchorPoint: 'TOP_CENTER' }"
            >
              <div style="text-align: center">
                <q-icon
                  class="ri-map-pin-fill text-green-600 !text-xl"
                ></q-icon>
              </div>
            </CustomMarker>
          </GoogleMap>
        </q-dialog>
      </q-avatar>
      <div class="pr-2">
        <div class="text-sm uppercase font-bold ellipsis">
          {{ travel.title }}
        </div>
        <div class="text-xs">{{ travel.description }}</div>
        <div class="grid grid-cols-4 pt-2">
          <div class="flex flex-row col-span-2">
            <q-icon class="ri-calendar-line"></q-icon>
            <div class="text-xs ml-1">{{ travel.dueDate }}</div>
          </div>
          <div class="flex flex-row col-span-1">
            <q-icon class="ri-time-line"></q-icon>
            <div class="text-xs ml-1">{{ travel.dueTime }}</div>
          </div>
          <div class="flex flex-row">
            <q-icon class="ri-star-line"></q-icon>
            <div class="text-xs ml-1">{{ travel.priority }}</div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="right" class="pt-4">
      <q-btn dense flat size="sm" color="primary">Detalles</q-btn>
      <q-btn
        dense
        flat
        size="sm"
        :color="travel.status == 'Pendiente' ? 'red' : 'secondary'"
        >{{ travel.status }}</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import { GoogleMap, CustomMarker } from "vue3-google-map";
export default defineComponent({
  name: "TravelCard",
  setup() {
    return {};
  },
  props: {
    travel: {
      type: Object,
      required: true,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showMap: false,
      center: {
        lat: 0,
        lng: 0,
      },
    };
  },
  components: {
    GoogleMap,
    CustomMarker,
  },

  mounted() {
    const center = this.travel.center.split(",");
    this.center.lat = parseFloat(center[0]);
    this.center.lng = parseFloat(center[1]);
    console.log(this.center, center);
  },
});
</script>
