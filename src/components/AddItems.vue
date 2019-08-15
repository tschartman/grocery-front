<template>
  <div>
    <v-form ref="form" lazy-validation>
      <h1>Items</h1>
      <v-layout row wrap pl-5 pr-5>
        <v-flex sm6 pr-3 pl-3>
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
        <v-flex sm6 pr-3 pl-3>
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
      <v-layout row wrap pl-5 pr-5>
        <v-flex sm4 pr-3 pl-3>
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
        <v-flex sm4 pr-3 pl-3>
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
        <v-flex sm4 pr-3 pl-3>
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
      <v-btn color="blue-grey" class="black--text" @click.native="openFileDialog">
        Upload
        <v-icon right dark> cloud_upload</v-icon>
      </v-btn>
      <input type="file" id="file-upload" style="display:none" @change="onFileChange">
      <v-btn color="success" @click="addItem">Add Item</v-btn>
    </v-form>
    <v-container fluid grid-list-md>
      <v-data-iterator
        :items="items"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        :expand="true"
        no-data-text="">
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
                         <v-img
                          v-if="props.item.image"
                          :src="props.item.image"
                        >
                         </v-img>
                    <span class="pl-3">{{
                      props.item.price | toCurrency
                    }}</span>
                  </v-flex>
                  <v-flex xs2>
                      <v-dialog v-model="dialog2" width="500">
                      <template v-slot:activator="{ on }">
                        <v-icon
                         v-on="on"
                        class="pl-4 icon"
                        >edit</v-icon>
                      </template>
                      <EditItem @close="close" @edit="edit" :item="props.item" :index="props.index" />
                    </v-dialog>
                    <v-icon
                    @click="deleteItem(props.index)"
                    class="pl-4 icon"
                    >delete
                    </v-icon>
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
                    >{{ (props.item.price / props.item.weight) | toCurrency }} /
                    Oz.</v-list-tile-content
                  >
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>
<script>
import Vue from "vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import EditItem from './EditItem.vue';

Vue.component("EditItem", EditItem);

export default {


  mixins: [validationMixin],
  name: "AddItems",
  validations: {
    brand: { required },
    name: { required },
    quantity: { required },
    price: { required },
    weight: { required }
  },

  data() {
    return {
      name: "",
      brand: "",
      type: "",
      price: null,
      quantity: null,
      weight: null,
      items: [],
      expanded: false,
      dialog2: false,
      formData: new FormData(),
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      }
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
    addItem() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let newItem = {
          name: this.name,
          brand: this.brand,
          price: this.price,
          quantity: this.quantity,
          weight: this.weight
        };
        this.items.push(newItem);
        this.$emit("addItem", newItem);
        this.$nextTick(() => { this.$v.$reset() })
        this.$refs.form.reset();
      }
    },
        openFileDialog() {
            document.getElementById('file-upload').click();
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;       
            if(files.length > 0){
                for(var i = 0; i< files.length; i++){
                    this.formData.append("file", files[i], files[i].name);
                }
            }   
          this.uploadFile()            
        },
        uploadFile() {
          console.log("here");
            this.$http
            .post('http://localhost:8000/api/parser/', this.formData)
            .then(response => {
                this.items = response.data.items
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    deleteItem(index){
      this.items.splice(index, 1)
      this.$emit("deleteItem", index);
    },
    edit(newItem, index){
      let updatedItem = {...this.items[index], ...newItem}
      this.items.splice(index, 1, updatedItem)
      this.$emit("editItem", newItem, index);
      this.dialog2 = false;
    },
    close() {
      this.dialog2 = false;
    },
  }
};
</script>

<style>
.icon{
  padding-right: 7px;
}
</style>
