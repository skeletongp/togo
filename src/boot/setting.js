import { boot } from "quasar/wrappers";
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default boot(async ({ app, router }) => {
  app.component("VueGoogleAutocomplete", VueGoogleAutocomplete);
});
