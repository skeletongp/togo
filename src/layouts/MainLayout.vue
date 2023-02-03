<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="flex items-center justify-between w-screen">
          <LeftMenu />
          <div class="text-h6">ToGo</div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import LeftMenu from "src/components/general/LeftMenu.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: { LeftMenu },

  setup() {
    return {};
  },
});
</script>
