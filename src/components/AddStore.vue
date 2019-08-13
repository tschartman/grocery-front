<template>
<v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md12>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Store</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <div>
                    <v-layout>
                      <v-flex sm12>
                        <v-autocomplete
                          v-model="model"
                          :items="items"
                          :loading="isLoading"
                          :search-input.sync="search"
                          :error-messages="nameErrors"
                          hide-no-data
                          hide-selected
                          item-text="Name"
                          label="Stores"
                          placeholder="Start typing to Search"
                          return-object
                          @change="$v.name.$touch()"
                          @blur="$v.name.$touch()"
                        >
                        </v-autocomplete>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex sm12>
                        <v-text-field
                        label="Address Line 1"
                        v-model="address"
                        :error-messages="addressErrors"
                        @input="$v.address.$touch()"
                        @blur="$v.address.$touch()"
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout>
                      <v-flex pr-3 sm6>
                        <v-text-field
                        label="City"
                        v-model="city"
                        :error-messages="cityErrors"
                        @input="$v.city.$touch()"
                        @blur="$v.city.$touch()"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex sm2>
                        <v-select
                          :items="states"
                          filled
                          label="State"
                          :error-messages="stateErrors"
                          v-model="state"
                          @change="$v.state.$touch()"
                          @blur="$v.state.$touch()"
                        ></v-select>
                      </v-flex>
                      <v-flex pl-3 sm4>
                        <v-text-field
                        label="Zip"
                        type="number"
                        :counter="5"
                        v-model="zip"
                        :error-messages="zipErrors"
                        @input="$v.zip.$touch()"
                        @blur="$v.zip.$touch()"
                      ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-form>
             </v-card-text>
              <v-card-actions>
                <v-btn color="error" @click="cancel">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="submit">submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required },
    address: { required },
    city: { required },
    state: { required },
    zip: { required, maxLength: maxLength(5), minLength: minLength(5) },
  },

  name: "AddStore",
  data: () => ({
    entries: [],
    states: [
      "Alaska",
      "Alabama",
      "Arkansas",
      "American Samoa",
      "Arizona",
      "California",
      "Colorado",
      "Connecticut",
      "District of Columbia",
      "Delaware",
      "Florida",
      "Georgia",
      "Guam",
      "Hawaii",
      "Iowa",
      "Idaho",
      "Illinois",
      "Indiana",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Massachusetts",
      "Maryland",
      "Maine",
      "Michigan",
      "Minnesota",
      "Missouri",
      "Mississippi",
      "Montana",
      "North Carolina",
      " North Dakota",
      "Nebraska",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "Nevada",
      "New York",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Puerto Rico",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Virginia",
      "Virgin Islands",
      "Vermont",
      "Washington",
      "Wisconsin",
      "West Virginia",
      "Wyoming"
    ],
    isLoading: false,
    model: null,
    search: null,
    name: "",
    domain: "",
    address: "",
    city: "",
    state: "",
    zip: ""
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
      return this.entries.map(entry => {
        const Name = entry.name;

        return Object.assign({}, entry, { Name });
      });
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Store is required.");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      !this.$v.address.required && errors.push("Address is required.");
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.required && errors.push("City is required.");
      return errors;
    },
    stateErrors() {
      const errors = [];
      if (!this.$v.state.$dirty) return errors;
      !this.$v.state.required && errors.push("State is required.");
      return errors;
    },
    zipErrors() {
      const errors = [];
      if (!this.$v.zip.$dirty) return errors;
      (!this.$v.zip.maxLength || !this.$v.zip.minLength) && errors.push("Zip must be 5 numbers") 
      !this.$v.zip.required && errors.push("Zip Code is required.");
      return errors;
    },
  },

  watch: {
    model(val, oldval) {
      this.name = val.name;
      this.domain = val.domain;
    },

    search(val) {
      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch(
        "https://autocomplete.clearbit.com/v1/companies/suggest?query=:" + val
      )
        .then(res => res.json())
        .then(res => {
          const entries = res;
          this.entries = entries;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
        if (!this.$v.$invalid) {
        let store = {
          name: this.name,
          domain: this.domain,
          address: this.address,
          city: this.city,
          state: this.state,
          zipcode: this.zip
        };
        this.$http
          .post("http://localhost:8000/stores/", store)
          .then(result => {
            this.$emit("close", false);
          })
          .catch(error => {});
        }
    },
    cancel() {
        this.$emit("close");
    }
  }
};
</script>
