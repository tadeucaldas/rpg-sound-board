<template>
  <div>
    <v-card>
      <v-subheader>Categories <v-icon class="ml-2" size="12">fa fa-folder-tree</v-icon></v-subheader>
      <v-card-text>
        <v-row>
          <v-col>
            <v-treeview
              hoverable
              activatable
              @update:active="changeCategory"
              dense
              expand-icon="fal fa-xs fa-chevron-down"
              item-key="doc._id"
              item-text="doc.name"
              :items="tree"
              return-object
            >
              <template v-slot:prepend="{ open }">
                <v-icon size="12">
                  {{ open ? "fal fa-folder-open" : "fal fa-folder" }}
                </v-icon>
              </template>
              <template v-slot:append="{ item }" v-if="!viewOnly">
                <v-btn icon small @click="editCategoty(item.doc)">
                  <v-icon size="12">fal fa-pencil</v-icon>
                </v-btn>
                <v-btn icon small>
                  <v-icon size="12">fal fa-trash</v-icon>
                </v-btn>
                <v-btn icon small @click="newCategory(item.doc)">
                  <v-icon size="12">fal fa-folder-tree</v-icon>
                </v-btn>
              </template>
            </v-treeview>
          </v-col>
        </v-row>
        <v-row v-if="!viewOnly">
          <v-col class="text-center">
            <v-btn small rounded color="success" @click="newCategory()"
              >Create new Category</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" persistent width="300" v-if="!viewOnly">
      <v-card>
        <v-subheader>Edit category</v-subheader>
        <v-card-text>
          <v-text-field
            label="Name"
            placeholder="Name your category"
            v-model="currentCategory.name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="saveCategory()" color="success">Save</v-btn>
          <v-btn @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  categoryRepository,
  saveCategory,
} from "@/repository/categoryRepository";

export default {
  name: "LibraryCategories",
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    categories: [],
    currentCategory: {},
    dialog: false,
  }),
  computed: {
    tree() {
      let trunk = this.categories.filter((value) => !value.doc.parent);
      trunk.forEach(this.getChildren);
      return trunk;
    },
  },
  created() {
    this.getCategories();
  },
  methods: {
    changeCategory(value){
      this.$emit('changeCategory', value[0] ? value[0].doc : null);
    },
    newCategory(parent) {
      this.dialog = true;
      this.currentCategory = {};
      if (parent) {
        this.currentCategory.parent = parent._id;
      }
    },
    editCategoty(category) {
      this.dialog = true;
      this.currentCategory = category;
    },
    saveCategory() {
      saveCategory(this.currentCategory).then(() => {
        this.getCategories();
        this.closeDialog();
      });
    },
    closeDialog() {
      this.dialog = false;
      this.currentCategory = {};
    },
    getCategories() {
      categoryRepository.allDocs({ include_docs: true }).then((result) => {
        this.categories = result.rows;
      });
    },
    getChildren(currentVal) {
      let children = this.categories.filter(
        (value) => value.doc.parent == currentVal.doc._id
      );
      if (children.length > 0) {
        currentVal.children = children;
        currentVal.children.forEach(this.getChildren);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>