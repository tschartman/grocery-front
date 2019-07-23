<template> 
<v-card
    color="red lighten-2"
    dark
  >

<v-toolbar
    dark
    color="teal"
  >
    <v-toolbar-title>State selection</v-toolbar-title>
    <v-autocomplete
      v-model="model"
      :loading="loading"
      :items="items"
      item-text="name"
      item-value="manu"
      :search-input.sync="search"
      cache-items
      class="mx-3"
      flat
      hide-no-data
      label="Search Foods"
      solo-inverted
      return-object
    ></v-autocomplete>
    
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>

    <v-card-title class="headline red lighten-3">
      Search for Public APIs
    </v-card-title>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-list v-if="model" class="red lighten-3">
        <v-list-tile
          v-for="(field, i) in fields"
          :key="i"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="field.value"></v-list-tile-title>
            <v-list-tile-sub-title v-text="field.key"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-expand-transition>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!model"
        color="grey darken-3"
        @click="model = null"
      >
        Clear
        <v-icon right>mdi-close-circle</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
export default {
    data () {
      return {
        loading: false,
        model: null,
        items: [],
        search: null,
        select: null,
      }
    },
        computed: {
      fields () {
        if (!this.model) return []

        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a'
          }
        })
      }
    },
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      }
    },
    methods: {
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          fetch('https://api.nal.usda.gov/ndb/search/?format=json&q=' + v + '&sort=r&offset=0&api_key=4TmpUfXUBL6teVnic2mJ4I7v2Ghv1rEEGzYNG5L1')
          .then(res => res.json())
          .then(res => {
            this.items = res.list.item
          })
          this.loading = false
        }, 500)
      }
    }
  }
</script>

<style>

</style>