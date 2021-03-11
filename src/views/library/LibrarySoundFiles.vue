<template>
  <v-card>
    <v-subheader>Sound Files <v-icon class="ml-2" size="12">fa fa-volume-up</v-icon></v-subheader>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <AudioPlayerSimple />
          </v-col>
        </v-row>
      </v-container> </v-card-text
  ></v-card>
</template>

<script>
import AudioPlayerSimple from "@/components/AudioPlayerSimple"

export default {
  name: "LibrarySoundFiles",
  components: {AudioPlayerSimple},
  data: () => ({})
};
</script>

<style lang="scss" scoped>
</style>