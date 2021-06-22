<template>
  <div>
    <v-card>
      <v-subheader>Characters </v-subheader>
      <v-card-text>
        <v-slide-group show-arrows>
          <v-slide-item
            v-for="item in characters"
            :key="item.doc._id"
            class="mx-1"
          >
            <v-card @click="editChar(item.doc)">
              <v-card-text class="text-center">
                <v-avatar size="72">
                  <img :src="'local-resource://' + item.doc.image" />
                </v-avatar>
                <div class="mt-1 subtitle-1">{{ item.doc.name }}</div>
              </v-card-text>
            </v-card>
          </v-slide-item>
        </v-slide-group>

        <v-btn color="success" text @click="newChar()"
          ><v-icon left>fal fa-helmet-battle</v-icon> New character</v-btn
        ></v-card-text
      ></v-card
    >
    <v-dialog v-model="dialog" scrollable persistent fullscreen>
      <v-card>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="3">
                <AvatarSelector v-model="selectedChar.image" />
                <v-radio-group v-model="selectedChar.type" row>
                  <v-radio value="player" label="Player" />
                  <v-radio value="npc" label="NPC" />
                </v-radio-group>
                <v-text-field
                  v-model="selectedChar.name"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col>
                <drop @drop="handleDrop">
                  <v-card min-height="100">
                    <AudioPlayerSimple
                      v-for="(sound, index) in sounds"
                      :key="index"
                      :soundId="sound._id"
                    />
                  </v-card>
                </drop>
              </v-col>
            </v-row>
          </v-container>
          <Library />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel()">Cancel</v-btn>
          <v-btn color="success" @click="save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AvatarSelector from "@/components/AvatarSelector";
import AudioPlayerSimple from "@/components/AudioPlayerSimple";
import {
  saveCharacter,
  characterRepository,
} from "@/repository/characterRepository";
import { soundRepository } from "@/repository/soundRepository";
import Library from "../library/Library.vue";

export default {
  components: { AvatarSelector, AudioPlayerSimple, Library },
  props: {
    adventureId: {
      type: String,
    },
  },
  data() {
    return {
      dialog: false,
      selectedChar: {},
      characters: [],
      characterSounds: [],
      sounds: [],
    };
  },
  computed: {
    soundsSorted() {
      return this.sounds;
    },
  },
  watch: {
    adventureId() {
      this.loadCharacters();
    },
  },
  mounted() {
    this.loadCharacters();
  },
  methods: {
    handleDrop(data) {
      this.characterSounds.push({
        sound: data._id,
        character: this.selectedChar._id,
        new: true,
      });
      soundRepository.get(data._id).then((doc) => {
        this.sounds.push(doc);
      });
    },
    newChar() {
      this.dialog = true;
      this.selectedChar = {
        name: "",
        image: "",
        type: "",
        adventure: this.adventureId,
      };
    },
    editChar(char) {
      this.dialog = true;
      this.selectedChar = char;
    },
    cancel() {
      this.dialog = false;
      this.selectedChar = { name: "", image: "", type: "" };
    },
    save() {
      saveCharacter(this.selectedChar).then(() => {
        this.loadCharacters();
        this.dialog = false;
      });
    },
    loadCharacters() {
      let startkey = this.adventureId;
      let endkey = this.adventureId + "\ufff0";
      characterRepository
        .allDocs({ include_docs: true, startkey, endkey })
        .then((result) => {
          this.characters = result.rows;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>