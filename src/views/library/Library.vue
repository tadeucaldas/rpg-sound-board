<template>
  <v-container class="pa-4" fluid>
    <v-row>
      <v-col cols="3">
        <v-row>
          <v-col><LibraryCategories/>
          </v-col>
        </v-row>
        <v-row>
          <v-col><LibraryTags /></v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <LibrarySoundFiles />
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
  data: () => ({}),
};
</script>

<style>
</style>