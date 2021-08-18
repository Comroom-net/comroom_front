<template>
  <div>
    <h4 class="mt-5">공지사항</h4>
    <v-card class="notice">
      <v-list>
        <v-list-item two-line v-for="notice in notices" :key="notice.id">
          <v-list-item-content class="py-2">
            <v-list-item-title v-html="notice.context" class="text-wrap"></v-list-item-title>
            <v-list-item-subtitle>{{notice.last_update | formatDate}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import api from "Api/functions/common";

export default {
  name: "Notice",
  data() {
    return {
      notices: []
    };
  },
  methods: {},
  created: function() {
    api.getNotice(this);
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY.MM.DD");
      }
    }
  }
};
</script>

<style scoped>
.notice {
  text-align: left;
}
/* .wrap-text {
  -webkit-line-clamp: unset !important;
  white-space: normal;
} */
</style>