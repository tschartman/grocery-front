<template>
  <v-layout row>
    <v-flex pl-3 pr-3 xs6>
      <VisitDetail :align="'column'" :visit="visits[0]"></VisitDetail>
    </v-flex>
    <v-flex pl-3 pr-3 xs6>
      <VisitDetail :align="'column'" :visit="visits[1]"></VisitDetail>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
import VisitDetail from "./VisitDetail.vue";
import { mapState } from "vuex";

Vue.component("VisitDetail", VisitDetail);

export default {
  name: "CompareVisits",
  computed: {
    ...mapState(["visits"])
  },
  components: {
    VisitDetail
  },
  data() {
    return {};
  }
};
</script>

<style>
.mat-expanded {
  background: grey;
}
</style>
