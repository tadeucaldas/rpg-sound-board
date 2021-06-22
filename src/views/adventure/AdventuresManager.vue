<template>
  <div>
    <v-slide-group
      show-arrows
      v-model="selectedAdventure"
      @change="select()"
      mandatory
    >
      <v-slide-item>
        <v-btn rounded @click="createAdventure()"> Adicionar </v-btn>
      </v-slide-item>
      <v-slide-item
        v-for="item in adventures"
        :key="item.doc._id"
        class="mx-1"
        v-slot="{ active, toggle }"
        :value="item.doc"
      >
        <v-card @click="toggle" :color="active ? 'green' : undefined">
          <v-card-text class="text-center">
            <v-avatar size="72">
              <img :src="'local-resource://' + item.doc.image" />
            </v-avatar>
            <div class="mt-1 subtitle-1">{{ item.doc.name }}</div>
          </v-card-text>
        </v-card>
      </v-slide-item>
    </v-slide-group>
    <v-dialog
      v-model="dialog"
      persistent
      width="300"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>New Adventure</v-card-title>
        <v-card-text class="text-center my-2">
          <div>
            <AvatarSelector v-model="adventure.image" />
            <v-text-field v-model="adventure.name"></v-text-field>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel()">Cancel</v-btn>
          <v-btn color="success" @click="saveAdventure()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  saveAdventure,
  adventureRepository,
} from "@/repository/adventureRepository";
import AvatarSelector from "@/components/AvatarSelector";

export default {
  components: { AvatarSelector },
  data() {
    return {
      dialog: false,
      adventure: {},
      selectedAdventure: {},
      adventures: [],
    };
  },
  mounted() {
    this.loadAdventures();
  },
  methods: {
    select() {
      this.$emit('change', this.selectedAdventure);
    },
    createAdventure() {
      this.dialog = true;
      this.adventure = { name: "", image: "" };
    },
    cancel() {
      this.dialog = false;
    },
    saveAdventure() {
      saveAdventure(this.adventure).then(() => {
        this.dialog = false;
        this.loadAdventures();
      });
    },
    loadAdventures() {
      adventureRepository.allDocs({ include_docs: true }).then((result) => {
        this.adventures = result.rows;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>