<template>
  <v-card>
      <v-subheader>Tags <v-icon class="ml-2" size="12">fa fa-tag</v-icon></v-subheader>
    <v-card-text>
      <v-row>
        <v-col class="text-center">
          <v-btn-toggle v-model="tagColor" tile group dense>
            <v-btn v-for="(color, index) in colors" :key="index" :value="color" small>
              <v-icon :style="{color: color}" small>fa fa-circle</v-icon> 
            </v-btn>
          </v-btn-toggle>
          <v-text-field
            v-model="tagName"
            placeholder="Select color, write and press enter"
            filled
            hide-details
            dense
            rounded
            @keydown.enter="addTag()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-chip
            @click:close="deleteTag(item.doc)"
            class="mb-1 mr-1"
            small
            dark
            draggable
            :style="{ backgroundColor: item.doc.color }"
            v-for="(item, index) in tags"
            :key="index"
            close
            >{{ item.doc.name }}</v-chip
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import colors from "vuetify/lib/util/colors";
import { tagRepository, createTag } from "@/repository/tagsRepository";

export default {
  name: "LibraryTags",
  data: () => ({
    tagName: "",
    tagColor: "",
    tags: [],
    colors: [
      colors.red.base, colors.purple.base,
      colors.indigo.base, colors.lightBlue.base,
      colors.green.base, colors.lime.base,
      colors.orange.base, colors.pink.base
    ],
  }),
  created() {
    this.getTags();
  },
  methods: {
    getTags() {
      tagRepository.allDocs({ include_docs: true }).then((result) => {
        this.tags = result.rows;
      });
    },
    addTag() {
      let tag = { name: this.tagName, color: this.tagColor };
      createTag(tag).then(() => {
        this.tagName = "";
        this.tagColor = "";
        this.getTags();
      });
    },
    deleteTag(tag) {
      tagRepository.remove(tag).then(() => {
        this.getTags();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>