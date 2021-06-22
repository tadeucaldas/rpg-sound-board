<template>
  <div>
    <div style="display: none">
      <input type="hidden" :value="value" />
      <v-file-input
        id="file"
        ref="file"
        v-model="file"
        accept="image/*"
        @change="handleChange"
      ></v-file-input>
    </div>
    <v-row>
      <v-col class="text-center">
        <v-avatar size="72" color="grey">
          <img v-if="!file && value" :src="'local-resource://' + value" />
          <img v-if="imgUrl && file" :src="'local-resource://' + imgUrl" />
          <v-icon v-if="!imgUrl && !value" large dark>fa fa-image</v-icon>
        </v-avatar>
        <div class="pt-2">
          <v-btn color="success" @click="$refs.file.$refs.input.click()" text small>
            <v-icon left>fal fa-camera</v-icon> Edit image
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      file: null,
    };
  },
  computed: {
    imgUrl() {
      if (!this.file) {
        return "";
      } else {
        return this.file.path;
      }
    },
  },
  methods: {
    handleChange() {
      this.$emit("input", this.imgUrl);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>