<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>
      <v-icon>fa fa-square</v-icon>
      <v-icon>fa fa-circle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4 text-center">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
        <div>Welcome do your RPG Soundboard!</div>
      </v-sheet>
      <v-list>
        <v-list-item v-for="[icon, text, link] in links" :key="icon" link :to="link">
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
    links: [
      ["fa fa-list", "Library", "/"],
      ["fa fa-dungeon", "Adventures", "/adventures"],
      ["fa fa-dice-d20", "Session"],
      ["fa fa-info", "About"],
    ],
  }),
};
</script>