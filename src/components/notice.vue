<template>
  <div>
    <h3>공지사항</h3>
    <div class="row mt-5">
      <div class="col-12">
        <ul>
          <div v-for="notice in notices" :key="notice.id">
            <li>
              <span v-html="notice.context"></span>
              <small class="text-muted">- {{notice.last_update | formatDate}}</small>
            </li>
          </div>
        </ul>
      </div>
    </div>
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