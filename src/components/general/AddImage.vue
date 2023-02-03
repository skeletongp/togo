<template>
  <div>
    <a-upload-dragger
      v-model:fileList="files"
      name="file"
      :multiple="false"
      accept="image/png, image/jpeg, image/jpg, image/gif"
      @change="imageSelected"
      @drop="imageDroped"
      :beforeUpload="beforeUpload"
      class="!px-4 flex flex-col items-center"
    >
      <p class="ant-upload-drag-icon !my-0">
        <template v-if="previewImage">
          <div
            class="w-[150px] mx-auto h-[150px] bg-center bg-contain bg-no-repeat"
            :style="{ backgroundImage: 'url(' + previewImage + ')' }"
          ></div>
        </template>
        <template v-else>
          <q-icon class="ri-image-line !text-9xl text-gray-300"> </q-icon>
        </template>
      </p>
      <p class="ant-upload-text !text-sm !my-0">
        Seleccione o arrastre una imagen
      </p>
    </a-upload-dragger>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "AddImage",
  setup() {
    const beforeUpload = async (file) => {
      return false;
    };
    return {
      beforeUpload,
    };
  },

  data: () => ({
    files: [],
    previewImage: null,
  }),

  methods: {
    async imageSelected(file) {
      const extension = file.file.name.split(".").pop();
      if (
        extension !== "jpg" &&
        extension !== "png" &&
        extension !== "jpeg" &&
        extension !== "gif"
      ) {
        this.$message.error(
          "Sólo se permiten imégenes en formato jpg, png, jpeg y gif"
        );
        return;
      }
      await this.$gb.resizeImages([file.file]).then((resizedImage) => {
        const url = URL.createObjectURL(resizedImage[0]);
        this.previewImage = url;
        resizedImage[0].preview = url;
        this.$emit("loadimage", resizedImage);
      });
    },

    imageDroped() {
      console.log("image droped");
    },
  },

  mounted() {},
  emits: ["loadimage"],
});
</script>
