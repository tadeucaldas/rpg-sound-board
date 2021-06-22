<template>
  <v-container class="d-flex">
    <v-row>
      <v-col cols="3">
        <v-row>
          <v-col><LibraryCategories @changeCategory="changeCategory"/>
          </v-col>
        </v-row>
        <v-row v-if="showTags">
          <v-col><LibraryTags /></v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <LibrarySoundFiles :activeCategory="activeCategory"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LibraryCategories from "./LibraryCategories";
import LibrarySoundFiles from "./LibrarySoundFiles";
import LibraryTags from "./LibraryTags";

export default {
  name: "Library",
  components: { LibraryCategories, LibrarySoundFiles, LibraryTags },
  props: {
    showTags: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    activeCategory: {}
  }),
  methods: {
    changeCategory(value){
      this.activeCategory = value;
    }
  }
};
</script>

<style>
</style>