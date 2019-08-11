<template>
  <v-form ref="form" lazy-validation>
    <div>
      <h1>Visit</h1>
      <v-btn to="/addStore"><a>Add Store</a></v-btn>
      <v-layout row wrap pl-5 pr-5>
        <v-flex sm6 pl-3 pr-3>
          <v-autocomplete
            v-model="model"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            hide-no-data
            hide-selected
            item-text="Name"
            label="Stores"
            placeholder="Start typing to Search"
            return-object
          >
          </v-autocomplete>
        </v-flex>
        <v-flex sm6 pl-3 pr-3>
          <v-text-field
            label="Amount"
            v-model="amount"
            value="10.00"
            prefix="$"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap pl-5 pr-5>
        <v-flex pl-3 pr-3 xs6 sm6>
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Date"
                hint="YYYY-MM-DD format"
                persistent-hint
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex pl-3 pr-3 sm6>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="time"
                label="Time"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="time"
              use-seconds
              @input="menu1 = false"
            ></v-time-picker>
          </v-menu>
        </v-flex>
      </v-layout>
    </div>
    <br />
    <br />
    <AddItems @addItem="addItem" />
    <v-layout row wrap pl-5 pr-5>
      <v-flex sm6 pl-3 pr-3>
        <v-btn color="error" @click="cancel">
          Cancel
        </v-btn>
      </v-flex>
      <v-flex sm6 pl-3 pr-3>
        <v-btn color="success" @click="submit">
          submit
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>
<script>
import Vue from "vue";
import AddItems from "./AddItems.vue";

Vue.component("AddItems", AddItems);

export default {
  name: "AddVisit",
  components: {
    AddItems
  },
  data: () => ({
    visitItems: [],
    stores: [],
    isLoading: false,
    model: null,
    search: null,
    store: "",
    amount: "",
    date: new Date().toISOString().substr(0, 10),
    time: null,
    menu1: false,
    menu2: false
  }),

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    },
    items() {
      return this.stores.map(store => {
        const Name = store.name;
        return Object.assign({}, store, { Name });
      });
    }
  },

  watch: {
    model(val, oldval) {
      this.store = val.url;
    },

    search(val) {
      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      this.$http
        .get("http://localhost:8000/stores/")
        .then(res => {
          const stores = res.data.results;
          this.stores = stores;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  },

  methods: {
    cancel() {
      this.$router.push("/");
    },

    addItem(item) {
      this.visitItems.push(item);
    },

    submit() {
      this.$http
        .post("http://localhost:8000/visits/", {
          date: this.date + "T" + this.time,
          store: this.store,
          total: this.amount
        })
        .then(result => {
          this.visitItems
            .forEach(item => {
              this.$http
                .post("http://localhost:8000/items/", {
                  brand: item.brand,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  weight: item.weight,
                  visit: result.data.url
                })
                .catch(error => {
                  console.log(error.response);
                });
            })
            .then(this.$router.push("/"));
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>
