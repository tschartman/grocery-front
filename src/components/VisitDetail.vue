<template>
      <v-card>
        <v-toolbar color="teal" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title> {{ visit.store }} | {{ visit.date | formatDate }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>

        <v-expansion-panel
        v-model="panel"
        popout
        expand
        >
          <v-expansion-panel-content
            v-for="item in items"
            :key="item.id"
          >
            <template v-slot:header>
              <div>{{ item.brand }} {{ item.name }} - {{ item.weight }} Oz</div>
            </template>

            <v-card class="grey lighten-3">
              <v-card-text>x{{ item.quantity }} at {{ item.price | toCurrency }} each -  {{ (item.price * item.quantity) | toCurrency }}</v-card-text>
              <v-card-text>({{ item.price / item.weight | toCurrency }} per Oz)</v-card-text>    
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card>
</template>
<script>

export default {
  name: 'VisitDetail',
  props: ['visit'],
    data() {
        return {
            panel: [],
            items: []
        }
    },

methods: { 

    },
    mounted() {
      this.$api
            .get('detail.json')
            .then((result) => {
              this.items = result.data  
              })
        },
    }


</script>