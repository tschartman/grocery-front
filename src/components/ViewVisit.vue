<template>
  <v-layout row>
    <v-flex pl-5 pr-5 xs12>
      <VisitDetail :align="'row'" :visit="visits[0]"></VisitDetail>
    </v-flex>
  </v-layout>
</template>

<script>
import Vue from "vue";
import VisitDetail from "./VisitDetail.vue";
import { mapState } from "vuex";

Vue.component("VisitDetail", VisitDetail);

export default {
  name: "ViewVisit",
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
