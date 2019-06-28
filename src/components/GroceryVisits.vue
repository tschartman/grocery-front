<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Visits</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list three-line>
          <template v-for="visit in visits">
            <v-list-tile
              :key="visit.id"
              avatar
              @click="showVisitDetail(visit.id)"
            >
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
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    data() {
        return {
            visits: null
        }
    },

methods: { 
    showVisitDetail: function(id) {
        this.$router.push({ name: 'visit', params: { visitId: id.toString() } })
    }
},

    mounted() {
        this.$api
            .get('data.json')
            .then((result) => {this.visits = result.data})
        },
}

</script>
