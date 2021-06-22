<template>
  <v-container fluid>
    <v-sheet color="white" class="mx-auto mb-1" elevation="1">
      <AdventuresManager @change="updateAdventure" />
    </v-sheet>
    <v-row v-if="adventure">
      <v-col cols="6">
        <AdventuresScenaries :adventureId="adventure._id" />
      </v-col>
      <v-col cols="6">
        <AdventuresCharacters :adventureId="adventure._id" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdventuresManager from "./AdventuresManager";
import AdventuresCharacters from "./AdventuresCharacters";
import AdventuresScenaries from "./AdventuresScenaries";

export default {
  components: { AdventuresManager, AdventuresCharacters, AdventuresScenaries },
  data() {
    return {
      adventure: undefined,
    };
  },
  methods: {
    updateAdventure(data) {
      console.info(data);
      this.adventure = data;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>