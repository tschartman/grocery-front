<template>
  <v-card>
    <v-toolbar color="teal" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title> {{ visit.store.name }} </v-toolbar-title>

      <v-divider class="mx-3" inset vertical></v-divider>

      <span class="subheading">{{ visit.date | formatDate }}</span>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-checkbox v-model="expanded" indeterminate></v-checkbox>
      </v-btn>
    </v-toolbar>

    <div class="inside">
      <v-container fluid grid-list-md>
        <v-data-iterator
          :items="items"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          content-tag="v-layout"
          :expand="true"
          :column="align == 'column'"
          wrap
        >
          <template v-slot:item="props">
            <v-flex xs12 sm6 md4 lg3>
              <v-card>
                <v-card-title class="subheading text-capitalize">
                  <v-layout row wrap align-center>
                    <v-flex xs6>
                      <h4>{{ props.item.brand }} {{ props.item.name }}</h4>
                    </v-flex>
                    <v-flex xs4>
                      <span class="pl-3">{{
                        props.item.price | toCurrency
                      }}</span>
                    </v-flex>
                    <v-flex xs2>
                      <v-checkbox
                        v-model="props.expanded"
                        class="pl-4"
                        indeterminate
                      ></v-checkbox>
                    </v-flex>
                  </v-layout>
                </v-card-title>
                <v-divider></v-divider>
                <v-list v-if="props.expanded || expanded" dense>
                  <v-list-tile>
                    <v-list-tile-content>Price:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{
                      props.item.price | toCurrency
                    }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Quantity:</v-list-tile-content>
                    <v-list-tile-content class="align-end"
                      >X {{ props.item.quantity }}</v-list-tile-content
                    >
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Total:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{
                      (props.item.price * props.item.quantity) | toCurrency
                    }}</v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Weight:</v-list-tile-content>
                    <v-list-tile-content class="align-end"
                      >{{ props.item.weight }} Oz.</v-list-tile-content
                    >
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Price Per Oz:</v-list-tile-content>
                    <v-list-tile-content class="align-end"
                      >{{
                        (props.item.price / props.item.weight) | toCurrency
                      }}
                      / Oz.</v-list-tile-content
                    >
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </template>
        </v-data-iterator>
      </v-container>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "VisitDetail",
  props: ["visit", "align"],
  data() {
    return {
      expanded: false,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      items: []
    };
  },

  methods: {},
  mounted() {
    console.log(visit.items)
    this.$http.get("detail.json").then(result => {
      this.items = result.data;
    });
  }
};
</script>
<style>
.inside {
  height: 80vh;
  overflow: auto;
}
</style>
