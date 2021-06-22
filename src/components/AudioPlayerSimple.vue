<template>
  <drag :transfer-data="sound">
    <drop @drop="handleDrop">
      <v-card
        elevation="0"
        width="250"
        color="grey lighten-4"
        class="ma-2"
        v-if="sound"
      >
        <v-container fluid class="pa-0">
          <v-card-title class="title font-weight-light">
            <v-icon left>fa fa-dog</v-icon> {{ sound.name }}
          </v-card-title>
          <v-card-actions>
            <span class="pr-1">{{ currentTime }}</span>
            <v-progress-linear
              color="blue-grey"
              v-model="tracker"
            ></v-progress-linear
            ><span class="pl-1">{{ durationTime }}</span>
          </v-card-actions>
          <v-card-actions>
            <v-btn x-small icon @click="stopPlay()">
              <v-icon v-if="playing" x-small>fa fa-stop</v-icon>
              <v-icon v-else x-small>fa fa-play</v-icon>
            </v-btn>
            <v-btn
              x-small
              icon
              @click="soundPlayer.loop(!loop)"
              :color="loop ? 'success' : ''"
              ><v-icon x-small>fa fa-repeat</v-icon></v-btn
            >
            <v-btn x-small icon @click="changeType()"
              ><v-icon x-small>{{ sound.type.icon }}</v-icon></v-btn
            >
            <v-btn x-small icon @click="soundPlayer.mute(!muted)">
              <v-icon v-if="muted" x-small>fa fa-volume-mute</v-icon>
              <v-icon v-else x-small>fa fa-volume</v-icon>
            </v-btn>
            <v-slider hide-details dense v-model="volume" step="5"></v-slider>
          </v-card-actions>
        </v-container>
        <v-speed-dial v-model="fab" top right direction="left" absolute>
          <template v-slot:activator>
            <v-btn x-small v-model="fab" fab top elevation="">
              <v-icon x-small>fa fa-edit</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark x-small title="Edit name">
            <v-icon x-small>fa fa-text</v-icon>
          </v-btn>
          <v-btn fab dark x-small>
            <v-icon x-small>fa fa-folder</v-icon>
          </v-btn>
          <v-btn fab dark x-small>
            <v-icon x-small>fa fa-trash</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-card>
    </drop>
  </drag>
</template>

<script>
import { Howl } from "howler";
import { soundTypes, soundRepository } from "@/repository/soundRepository";
import { formatTime } from "@/utils/stringUtils";

export default {
  props: {
    soundId: String,
    hideIcon: {
      type: Boolean,
      default: false,
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
    hideVolume: {
      type: Boolean,
      default: false,
    },
    hideEditor: {
      type: Boolean,
      default: false,
    },
    hideTracker: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fab: false,
      sound: null,
      soundPlayer: null,
      soundTypes: soundTypes,
      volume: 100,
      position: 0,
    };
  },
  watch: {
    volume() {
      this.soundPlayer.volume(this.volume / 100);
    },
    playing() {
      setInterval(() => {
        if (this.playing) {
          this.updateTimer();
        } else {
          return;
        }
      }, 100);
    },
  },
  computed: {
    loaded() {
      return this.soundPlayer !== null && this.soundPlayer.state() === "loaded";
    },
    loop() {
      return this.loaded && this.soundPlayer.loop();
    },
    playing() {
      return this.loaded && this.soundPlayer.playing();
    },
    muted() {
      return this.loaded && this.soundPlayer.mute();
    },
    currentTime() {
      return this.loaded && formatTime(this.position);
    },
    durationTime() {
      return this.loaded && formatTime(this.soundPlayer.duration());
    },
    tracker() {
      return !this.loaded || !this.playing
        ? 0
        : (this.position * 100) / this.soundPlayer.duration();
    },
  },
  mounted() {
    soundRepository.get(this.soundId).then((result) => {
      this.sound = result;
      this.loadPlayer();
    });
  },
  methods: {
    handleDrop(data) {
      alert(`You dropped with data: ${JSON.stringify(data)}`);
    },
    loadPlayer() {
      this.soundPlayer = new Howl({
        src: "local-resource://" + this.sound.file.path,
      });
    },
    updateTimer() {
      this.position = this.soundPlayer.seek();
    },
    stopPlay() {
      this.playing ? this.soundPlayer.stop() : this.soundPlayer.play();
    },
    changeType() {},
  },
};
</script>

<style lang="scss" scoped>
</style>