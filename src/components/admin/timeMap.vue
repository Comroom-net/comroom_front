<template>
  <div>
    <h1 class="mt-10">{{school}}</h1>
    <h2>1교시 시작 시간</h2>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">
          {{selectTimes[startTimeIdx]}}
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group v-model="startTimeIdx" mandatory>
          <v-list-item v-for="(time, index) in selectTimes" :key="index">
            <v-list-item-title>{{ time }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <v-btn color="primary" @click="setTime">설정</v-btn>
    <v-btn color="error" to="/">취소</v-btn>
  </div>
</template>

<script>
import api from "Api/functions/timetable";

export default {
  name: "TimeMap",
  computed: {
    startTimeIdx: function() {
      return this.selectTimes.findIndex(t => t == this.startTime);
    }
  },
  data() {
    return {
      school: this.$session.get("school"),
      startTime: "09:00",
      selectTimes: ["08:40", "08:50", "09:00", "09:10"]
    };
  },
  mounted() {
    api.get_start_time(this);
  },
  methods: {
    setTime() {
      api.set_start_time(this);
    }
  }
};
</script>