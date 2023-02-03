<template>
  <q-page class="flex flex-col p-2 mt-4">
    <div class="text-left uppercase font-bold mb-4 text-xl">Nuevo VIaje</div>
    <q-card flat style="max-width: 420px" class="w-full h-full">
      <q-card-section class="p-1.5">
        <q-form @submit.prevent="saveTravel" class="space-y-2">
          <div class="flex justify-end">
            <q-btn dense @click="takePhoto">
              <q-icon class="ri-camera-line"></q-icon>
            </q-btn>
          </div>
          <q-input
            label="Título"
            v-model="travel.title"
            :error="errors.title !== undefined"
            :error-message="errors.title"
          />
          <q-input
            label="Descripción"
            dense
            v-model="travel.description"
            :maxlength="100"
            autogrow
            counter
            :error="errors.description !== undefined"
            :error-message="errors.description"
          />
          <div class="flex space-x-2">
            <DatePicker
              @input="setDate"
              :error="
                errors.dueDate !== undefined || errors.dueTime !== undefined
              "
              :error-message="errors.dueDate || errors.dueTime"
            />
            <q-select
              class="w-1/2"
              v-model="travel.priority"
              label="Prioridad"
              :error="errors.priority !== undefined"
              :error-message="errors.priority"
              :options="['Alta', 'Media', 'Baja']"
            />
          </div>
          <vue-google-autocomplete
            ref="address"
            id="map"
            classname="my-4 w-full p-2  rounded-sm border-b focus:outline-none "
            placeholder="Ingrese la dirección"
            v-on:placechanged="getAddressData"
            country="do"
            types="establishment"
          >
          </vue-google-autocomplete>
          <small class="mt-2 text-red-500" v-if="errors.location != undefined"
            >Ingrese una dirección</small
          >
          <GoogleMap
            api-key="AIzaSyAd55TaJNRJIDp8k9wAwT1Rmu8HJUEJCfQ"
            style="
              width: 100%;
              height: 240px;
              margin-top: 2rem;
              margin-bottom: 2rem;
            "
            :center="center"
            :zoom="14"
          >
            <CustomMarker
              :options="{ position: center, anchorPoint: 'TOP_CENTER' }"
            >
              <div style="text-align: center">
                <div style="font-size: 1.125rem">Aquí</div>
                <img
                  src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                  width="25"
                  height="25"
                  style="margin-top: 1px"
                />
              </div>
            </CustomMarker>
          </GoogleMap>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          @click="saveTravel"
          icon="save"
          label="Guardar"
          flat
          dense
          size="small"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import DatePicker from "src/components/general/DatePicker.vue";
import { defineComponent, ref } from "vue";
import validate from "src/rules/validation";
import { GoogleMap, CustomMarker } from "vue3-google-map";
import travelModel from "src/models/travel";
import { Notify } from "quasar";
import moment from "moment";
export default defineComponent({
  name: "NewTravel",

  setup() {
    return {};
  },
  data() {
    return {
      travel: {
        title: null,
        description: null,
        status: "Pendiente",
        priority: null,
        dueDate: null,
        dueTime: null,
        completedDate: null,
        completedTime: null,
        location: null,
      },
      errors: {},
      location: null,
      center: { lat: 18.43495064535872, lng: -70.00874082573954 },
    };
  },

  methods: {
    async saveTravel() {
      const isValid = validate(this.travel, "travel");
      if (isValid === true) {
        const newTravel = await travelModel.addTravel({
          ...this.travel,
        });

        Notify.create({
          message: "Viaje registrado con éxito",
          color: "positive",
          position: "top",
        });
        this.$router.push({
          name: "travel_list",
          params: { id: newTravel.id },
        });
      } else {
        this.errors = isValid;
      }
      console.log(this.travel);
    },
    takePhoto() {
      navigator.camera.getPicture(
        (imageData) => {
          alert(JSON.stringify(imageData));
        },
        (message) => {
          alert("Failed because: " + message);
        },
        {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          allowEdit: true,
          correctOrientation: true,
        }
      );
    },
    setDate(val) {
      const date = new Date(val);
      this.travel.dueDate = moment(date).format("YYYY-MM-DD");
      this.travel.dueTime = moment(date).format("HH:mm");
    },
    getAddressData(place) {
      console.log(place);
      this.travel.location = `${place.locality}, ${place.administrative_area_level_1}, ${place.country}`;
      this.center = { lat: place.latitude, lng: place.longitude };
      this.travel.center = { lat: place.latitude, lng: place.longitude };
    },
  },
  components: {
    GoogleMap,
    CustomMarker,
    DatePicker,
  },

  computed: {
    google: function () {
      return window.google;
    },
  },
});
</script>
