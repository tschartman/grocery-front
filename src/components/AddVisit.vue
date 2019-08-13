<template>
  <v-form ref="form" lazy-validation>
    <div>
      <h1>Visit</h1>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
        <v-layout row wrap pl-5 pr-5>
          <v-flex sm6 pl-3 pr-3>
            Store not listed?
          <a color="red lighten-2" dark v-on="on">
            Add Store
          </a>
          </v-flex>
        </v-layout>
        </template>
        <AddStore @close="close" />
      </v-dialog>
      <v-layout row wrap pl-5 pr-5>
        <v-flex sm6 pl-3 pr-3>
          <v-autocomplete
            v-model="model"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            :error-messages="storeErrors"
            hide-no-data
            hide-selected
            item-text="Name"
            label="Stores"
            placeholder="Start typing to Search"
            return-object
            @change="$v.store.$touch()"
            @blur="$v.store.$touch()"
          >
          <template slot="item" slot-scope="data">
          <v-list-tile-avatar>
            <img :src="'https://logo.clearbit.com/' + data.item.domain" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
          </v-list-tile-content>
        </template>
          </v-autocomplete>
        </v-flex>
        <v-flex sm6 pl-3 pr-3>
          <v-text-field
            label="Amount"
            type="number"
            v-model="amount"
            :error-messages="amountErrors"
            prefix="$"
            required
            @input="$v.amount.$touch()"
            @blur="$v.amount.$touch()"
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
                :error-messages="dateErrors"
                label="Date"
                prepend-icon="event"
                readonly
                required
                @input="$v.date.$touch()"
                @blur="$v.date.$touch()"
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
                :error-messages="timeErrors"
                label="Time"
                prepend-icon="event"
                readonly
                required
                @input="$v.time.$touch()"
                @blur="$v.time.$touch()"
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
import { validationMixin } from "vuelidate";
import { required, sameAs, minLength, email } from "vuelidate/lib/validators";
import AddItems from "./AddItems.vue";
import AddStore from "./AddStore.vue";

Vue.component("AddItems", AddItems);
Vue.component("AddStore", AddStore);

export default {
  mixins: [validationMixin],

  validations: {
    store: { required },
    amount: { required },
    date: { required },
    time: { required }
  },

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
    date: null,
    time: null,
    menu1: false,
    menu2: false,
    dialog: false
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
    },
    storeErrors() {
      const errors = [];
      if (!this.$v.store.$dirty) return errors;
      !this.$v.store.required && errors.push("Store is required.");
      return errors;
    },
    amountErrors() {
      const errors = [];
      if (!this.$v.amount.$dirty) return errors;
      !this.$v.amount.required && errors.push("An amount is required.");
      return errors;
    },
    dateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.required && errors.push("Date is required.");
      return errors;
    },
    timeErrors() {
      const errors = [];
      if (!this.$v.time.$dirty) return errors;
      !this.$v.time.required && errors.push("Time is required.");
      return errors;
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

    close() {
      this.dialog = false;
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
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
  }
};
</script>
