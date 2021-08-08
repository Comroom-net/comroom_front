<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">
          {{selectTimes[startTime]}}
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group v-model="startTime" mandatory>
          <v-list-item v-for="(time, index) in selectTimes" :key="index">
            <v-list-item-title>{{ time }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "TimeMap",
  data() {
    return {
      startTime: 2,
      selectTimes: ["08:40", "08:50", "09:00", "09:10"]
    };
  }
};
</script>