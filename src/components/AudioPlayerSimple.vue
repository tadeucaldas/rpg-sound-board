<template>
  <v-sheet color="grey lighten-3" height="100" width="250">
    <v-row>
      <v-col></v-col>
    </v-row>
    <v-row>
      <v-col
        ><v-slider v-model="alarm" :thumb-size="1" :tick-size="5" prepend-icon="fa fa-volume"></v-slider
      ></v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>