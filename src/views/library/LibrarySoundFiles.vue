<template>
  <v-card>
    <v-subheader
      >Sound Files
      <v-icon class="ml-2" size="12">fa fa-volume-up</v-icon></v-subheader
    >
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-file-input
              @change="addSounds()"
              label="Select files"
              filled
              prepend-icon="fa fa-file"
              v-model="files"
              multiple
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <AudioPlayerSimple
            v-for="(sound, index) in sounds"
            :key="index"
            :soundId="sound.id"
          />
        </v-row>
      </v-container> </v-card-text
  ></v-card>
</template>

<script>
import AudioPlayerSimple from "@/components/AudioPlayerSimple";
import {
  soundRepository,
  saveSounds,
  createId,
  soundTypes
} from "@/repository/soundRepository";

export default {
  props: {
    activeCategory: Object,
  },
  name: "LibrarySoundFiles",
  components: { AudioPlayerSimple },
  data: () => ({
    files: {},
    sounds: [],
  }),
  mounted(){
    this.getSounds();
  },
  watch: {
    activeCategory(){
      this.getSounds();
    }
  },
  methods: {
    getSounds() {
      if(!this.activeCategory || !this.activeCategory._id){
        this.sounds = [];
        return;
      }
      let startkey = this.activeCategory._id;
      let endkey = this.activeCategory._id + '\ufff0';
      soundRepository
        .allDocs({ include_docs: true, startkey, endkey })
        .then(result => {
          this.sounds = result.rows;
        });
    },
    addSounds() {
      let soundsToSave = [];
      this.files.forEach((element) => {
        let item = this.prepareSound(element);
        soundsToSave.push(item);
      });
      debugger
      saveSounds(soundsToSave).then(this.getSounds);
      this.files = [];
    },
    prepareSound(file) {
      let item = {
        name: file.name.split(".")[0],
        type: soundTypes[0],
        category: this.activeCategory._id,
        file: {
          name: file.name,
          path: file.path,
          type: file.type
        },
      };
      item._id = createId(item);
      debugger
      return item;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>