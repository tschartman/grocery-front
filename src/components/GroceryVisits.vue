<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Visits</v-toolbar-title>
          <v-divider class="mx-3" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-divider vertical></v-divider>
            <v-btn flat @click="compareView = !compareView"
              >Compare Visits</v-btn
            >
            <v-divider vertical></v-divider>
          </v-toolbar-items>
          <v-btn to="/addVisit" icon>
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list three-line>
          <template>
            <v-list-tile
              v-for="visit in visits"
              :key="visit.id"
              avatar
              @click.capture.stop="tileClick(visit)"
            >
              <v-list-tile-action v-if="compareView">
                <v-checkbox
                  @click.prevent=""
                  v-model="selected"
                  :value="visit"
                ></v-checkbox>
              </v-list-tile-action>

              <v-list-tile-avatar>
                <img
                  :src="'https://logo.clearbit.com/' + visit.store.domain"
                />
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ visit.store.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{
                  visit.store.address
                }}</v-list-tile-sub-title>
                <v-list-tile-sub-title
                  >{{ visit.total | toCurrency }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
      <div>
        <v-btn v-if="compareView" @click="compareVisits" color="info"
          >Compare</v-btn
        >
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      visits: [],
      compareView: false,
      selected: []
    };
  },

  methods: {
    tileClick(visit) {
      if (!this.compareView) {
        this.showVisit(visit);
      } else {
        this.toggle(visit);
      }
    },

    toggle(visit) {
      if (this.selected.includes(visit)) {
        this.selected.splice(this.selected.indexOf(visit), 1);
      } else {
        this.selected.push(visit);
      }
    },
    ...mapMutations(["COMPARE_VISITS", "SHOW_VISIT"]),
    compareVisits: function() {
      this.COMPARE_VISITS(this.selected);
      this.$router.push({ path: "compareVisits" });
    },
    showVisit(visit) {
      var tempArr = [];
      tempArr.push(visit);
      this.SHOW_VISIT(tempArr);
      this.$router.push({ path: "viewVisit" });
    }
  },

  mounted() {
    this.$http.get("http://localhost:8000/visits/").then(result => {
      this.visits = result.data.results;
      this.visits.forEach((visit, index) => {
        this.$http.get(visit.store).then(result => {
          this.visits[index]['store'] = result.data
        })
      })
    });
  }
};
</script>
