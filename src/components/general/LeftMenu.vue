<template>
  <div class="pl-1.5 pt-1.5 relative">
    <q-btn flat dense size="sm" @click="opened = !opened">
      <q-icon v-if="opened" class="ri-menu-fold-line"></q-icon>
      <q-icon v-else class="ri-menu-unfold-line"></q-icon>
    </q-btn>
    <q-drawer
      v-model="opened"
      :width="200"
      :breakpoint="100"
      bordered
      mini-to-overlay
      :mini="mini"
      class="bg-grey-3"
    >
      <q-scroll-area class="fit text-black">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              :active="menuItem.key === $route.name"
              clickable
              @click="$router.push({ name: menuItem.key })"
            >
              <q-item-section avatar>
                <q-icon :class="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
        <q-btn
          flat
          dense
          class="absolute bottom-2"
          :class="mini ? 'left-2' : 'right-2'"
          @click="mini = !mini"
        >
          <q-icon
            :class="mini ? 'ri-arrow-right-s-line' : 'ri-arrow-left-s-line'"
          />
        </q-btn>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import menuList from "src/vars/menu";

export default defineComponent({
  name: "LeftMenu",

  components: {},

  setup() {
    return {
      menuList,
    };
  },
  data() {
    return {
      opened: true,
      mini: true,
    };
  },
});
</script>
