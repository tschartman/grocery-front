<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <div>
    <v-layout row wrap>
      <v-flex xs6 sm6>
        <v-text-field
          v-model="store"
          label="Store"
          required
        ></v-text-field>
      </v-flex>  
      <v-flex xs6 sm6>
        <v-text-field
          label="Amount"
          v-model="amount"
          value="10.00"
          prefix="$"
        ></v-text-field>
      </v-flex>  
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6 sm6>
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
              v-model="computedDateFormatted"
              label="Date (read only text field)"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-flex>  
      <v-flex xs6 sm6>
          <v-text-field
          label="Address"
          v-model="address"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
    <v-btn
      color="error"
      @click="reset"
    >
     Reset Form
    </v-btn>
 <v-btn color="success" @click="submit">submit</v-btn>

  </v-form>
</template>
<script>
  export default {
    data: (vm) => ({
      valid: true,
      store: '', 
      address: '',
      amount: '',
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false
    
    }),

   computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },

 watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },

    methods: {
      reset () {
        this.$refs.form.reset()
      },

      formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
          },

      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }
</script>