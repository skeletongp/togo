<template>
  <div>
    <q-input
      v-model="date"
      readonly
      label="Fecha y hora"
      :error="error"
      :error-message="errorMessage"
    >
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            cover
            transition-show="scale"
            transition-hide="scale"
            @hide="sendDate"
          >
            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy
            cover
            transition-show="scale"
            transition-hide="scale"
            @hide="sendDate"
          >
            <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "DatePicker",
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
  data() {
    return {
      date: "",
    };
  },

  methods: {
    sendDate() {
      this.$emit("input", this.date);
    },
  },

  emits: ["input"],
});
</script>
