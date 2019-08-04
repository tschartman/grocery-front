<template>
  <v-form ref="form" lazy-validation>
    <div>
      <h1>Visit</h1>
      <v-layout row wrap pl-5 pr-5>
        <v-flex sm6 pl-3 pr-3>
          <v-text-field v-model="store" label="Store" required></v-text-field>
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
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex pl-3 pr-3 sm6>
          <v-text-field label="Address" v-model="address"></v-text-field>
        </v-flex>
      </v-layout>
    </div>
    <br />
    <br />
    <AddItems @addItem="addItem" />
    <v-layout row wrap pl-5 pr-5>
      <v-flex sm6 pl-3 pr-3>
        <v-btn color="error" @click="reset">
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
    items: [],
    store: "",
    address: "",
    amount: "",
    date: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false
  }),

  methods: {
    reset() {
      this.$refs.form.reset();
    },

    addItem(item) {
      this.items.push(item);
    },

    submit() {
      this.$http
        .post("http://localhost:8000/visits/", {
          date: this.date + "T12:21:56Z",
          store: this.store,
          total: this.amount,
          location: this.address
        })
        .then(result => {
          this.items.forEach(item => {
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
          });
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>
