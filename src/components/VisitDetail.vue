<template>
 <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="teal" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Items</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>

        <v-expansion-panel
        v-model="panel"
        expand
        >
          <v-expansion-panel-content
            v-for="item in items"
            :key="item.id"
          >
            <template v-slot:header>
              <div>{{ item.brand }} {{ item.name }} - {{ item.weight }} Oz</div>
            </template>

            <v-card>
              <v-card-text>x{{ item.quantity }} at {{ item.price | toCurrency }} each -  {{ (item.price * item.quantity) | toCurrency }}</v-card-text>
              <v-card-text>({{ item.price / item.weight | toCurrency }} per Oz)</v-card-text>    
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card>
    </v-flex>
 </v-layout>
</template>
<script>

export default {
    data() {
        return {
            items: [],
            panel: [],
            id: 0
        }
    },

methods: { 

    },


    mounted() {
        this.id = parseInt(this.$route.params.visitId)
        
        this.$api
            .get('detail.json')
            .then((result) => {this.items = result.data})
        },
}


</script>