<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Visits</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
            flat
            @click="compareView = !compareView"
            >Compare Visits</v-btn>
          </v-toolbar-items>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list three-line>
          <template >
            <v-list-tile
              v-for="visit in visits"
              :key="visit.id"
              avatar
             @click.capture.stop="toggle(visit)"
            >
             <v-list-tile-action v-if="compareView">
              <v-checkbox @click.prevent=""  v-model="selected" :value="visit"></v-checkbox>
            </v-list-tile-action>

              <v-list-tile-avatar>
                <img :src="'https://logo.clearbit.com/' + visit.store + '.com'">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ visit.store }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ visit.location }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ visit.total | toCurrency }} - {{ visit.items }} Items </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
      <div>
        <v-btn v-if="compareView" @click="compareVisits" color="info">Compare</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>
    


<script>
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            visits: [],
            compareView: false,
            selected: [],
        }
    },

methods: { 
    showVisitDetail: function(id) {
        this.$router.push({ name: 'visit', params: { visitId: id.toString() } })
    },
    toggle(visit) {
      if (this.selected.includes(visit)) {
        this.selected.splice(this.selected.indexOf(visit),1);
      } else {
        this.selected.push(visit);
      }
    },
    ...mapMutations([
      'COMPARE_VISITS'
    ]),
    compareVisits: function() {
      this.COMPARE_VISITS(this.selected)
      this.$router.push({path:'compareVisits'})
    }
},

    mounted() {
        this.$api
            .get('data.json')
            .then((result) => {
              this.visits = result.data  
              })
        },
}

</script>
