<template>
<v-layout row>
  <v-flex pl-3 pr-3 xs6>
    <VisitDetail :visit="visits[0]"></VisitDetail>
   </v-flex>
   <v-flex pl-3 pr-3 xs6>
    <VisitDetail :visit="visits[1]"></VisitDetail>
   </v-flex>
 </v-layout>
</template>


<script>
import Vue from 'vue'
import VisitDetail from './VisitDetail.vue'
import { mapState } from 'vuex'

Vue.component('VisitDetail', VisitDetail);

export default {
    name: 'CompareVisits',
    computed: {
        ...mapState([
        'visits'
    ])
    },
      components: {
        VisitDetail,
    },
    data() {
        return {
            panel: [],
        }
    },


methods: { 

    },

    mounted() {
        
        },
}
</script>

<style>

.mat-expanded {
  background: grey;
}

</style>