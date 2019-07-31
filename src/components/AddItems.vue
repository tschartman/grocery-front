<template>
<div>
<v-form
    ref="form"
    lazy-validation
  >
        <h1>Items</h1>
    <v-layout row wrap pl-3 pr-5>
    <v-flex sm4 pr-3 pl-3>
        <v-text-field
          v-model="brand"
          label="Brand"
          required
        ></v-text-field>
    </v-flex>
      <v-flex sm4 pr-3 pl-3>
        <v-text-field
          v-model="name"
          label="Name"
          required
        ></v-text-field>
      </v-flex>
        <v-flex sm2 pr-3 pl-3>
            <v-text-field
          v-model="price"
          label="Price"
          required
        ></v-text-field>
        </v-flex>
        <v-flex sm1 pr-3 >
            <v-text-field
          v-model="quantity"
          label="Quantity"
          required
        ></v-text-field>
        </v-flex>
        <v-flex sm1>
            <v-text-field
          v-model="weight"
          label="Weight"
          required
        ></v-text-field>
      </v-flex>  
    </v-layout>
     <v-btn color="success" @click="addItem">Add Item</v-btn>
    </v-form>
    <v-container fluid grid-list-md>
          <v-data-iterator
            :items="items"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            content-tag="v-layout"
            :expand="true"
            wrap
          >
             <template v-slot:item="props">
              <v-flex
                xs12
                sm6
                md4
                lg3
              >
                  <v-card>
                    <v-card-title class="subheading text-capitalize">
                      <v-layout row wrap align-center>
                        <v-flex xs6>
                          <h4>{{ props.item.brand }} {{ props.item.name }}</h4>
                        </v-flex>
                        <v-flex xs4>
                          <span class="pl-3">{{ props.item.price | toCurrency }}</span>
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
                      <v-list-tile-content class="align-end">{{ props.item.price | toCurrency }}</v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>Quantity:</v-list-tile-content>
                      <v-list-tile-content class="align-end">X {{ props.item.quantity }}</v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>Total:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.price * props.item.quantity | toCurrency }}</v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>Weight:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.weight }} Oz.</v-list-tile-content>
                    </v-list-tile>
                    
                    <v-list-tile>
                      <v-list-tile-content>Price Per Oz:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.price / props.item.weight | toCurrency }} / Oz.</v-list-tile-content>
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

export default {

    data() {
          return {
        name: '',
        brand: '',
        type: '',
        price: null,
        quantity: null,
        weight: null,
        items: [],
        expanded: false,
        rowsPerPageItems: [4, 8, 12],
        pagination: {
            rowsPerPage: 4
          },
        }
    },
    methods: {
    addItem() {
        this.items.push({
            name: this.name,
            brand: this.brand,
            price: this.price,
            quantity: this.quantity,
            weight: this.weight,
        })
        this.$refs.form.reset()
        console.log(this.items)
    }
  }
}
</script>

<style>

</style>