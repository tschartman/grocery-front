<template>
  <v-form ref="form" lazy-validation>
    <div>
      <h1>Store</h1>
      <v-layout row wrap pl-5 pr-5>
        <v-flex pr-3 sm12>
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
      </v-layout>
      <v-layout row wrap pl-5 pr-5>
        <v-flex pl-3 pr-3 sm12>
          <v-text-field label="Address Line 1" v-model="address"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap pl-5 pr-5>
        <v-flex pl-3 pr-3 sm6>
          <v-text-field label="City" v-model="city"></v-text-field>
        </v-flex>
        <v-flex pl-3 pr-3 sm2>
          <v-select
            :items="states"
            filled
            label="State"
            v-model="state"
          ></v-select>
        </v-flex>
        <v-flex pl-3 pr-3 sm4>
          <v-text-field label="Zip" v-model="zip"></v-text-field>
        </v-flex>
      </v-layout>
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
    </div>
  </v-form>
</template>
<script>
export default {
  name: "AddStore",
  data: () => ({
    descriptionLimit: 60,
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
    }
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
          this.$router.push({ path: "addVisit" });
        })
        .catch(error => {});
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
