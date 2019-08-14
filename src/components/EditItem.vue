<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm12 md12>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Edit Item</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
 <v-form ref="form" lazy-validation>
      <v-layout row wrap pl-1 pr-1>
        <v-flex sm6 pr-3>
          <v-text-field
            v-model="brand"
            :error-messages="brandErrors"
            label="Brand"
            required
            @input="$v.brand.$touch()"
            @blur="$v.brand.$touch()"
          >
          </v-text-field>
        </v-flex>
        <v-flex sm6>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          >
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap pl-1 pr-1>
        <v-flex sm4 pr-3>
          <v-text-field
            v-model="quantity"
            type="number"
            :error-messages="quantityErrors"
            label="Quantity"
            required
            @input="$v.quantity.$touch()"
            @blur="$v.quantity.$touch()"
          ></v-text-field>
        </v-flex>
        <v-flex sm4 pr-3>
          <v-text-field
            v-model="price"
            :error-messages="priceErrors"
            prefix="$"
            label="Price"
            type="number"
            required
            @input="$v.price.$touch()"
            @blur="$v.price.$touch()"
          >
          </v-text-field>
        </v-flex>
        <v-flex sm4>
          <v-text-field
            v-model="weight"
            :error-messages="weightErrors"
            suffix="Oz"
            label="Weight"
            type="number"
            required
            @input="$v.weight.$touch()"
            @blur="$v.weight.$touch()"
          >
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="error" @click="cancel">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="success" @click="editItem">submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "EditItem",
  props: ["item", "index"],
  validations: {
    brand: { required },
    name: { required },
    quantity: { required },
    price: { required },
    weight: { required }
  },

  data() {
    return {
      name: this.item.name,
      brand: this.item.brand,
      price: this.item.quantity,
      quantity: this.item.price,
      weight: this.item.weight,
    };
  },
  computed: {
    brandErrors() {
      const errors = [];
      if (!this.$v.brand.$dirty) return errors;
      !this.$v.brand.required && errors.push("Brand is required.");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    quantityErrors() {
      const errors = [];
      if (!this.$v.quantity.$dirty) return errors;
      !this.$v.quantity.required && errors.push("Quantity is required.");
      return errors;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.price.$dirty) return errors;
      !this.$v.price.required && errors.push("Price is required.");
      return errors;
    },
    weightErrors() {
      const errors = [];
      if (!this.$v.weight.$dirty) return errors;
      !this.$v.weight.required && errors.push("Weight is required.");
      return errors;
    }
  },
  methods: {
  
    editItem() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let newItem = {
          name: this.name,
          brand: this.brand,
          price: this.price,
          quantity: this.quantity,
          weight: this.weight
        };
        this.$emit("edit", newItem, this.index);
      }
    },
    cancel() {
      this.$emit("close");
    }
  }
};
</script>