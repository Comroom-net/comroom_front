<template>
  <div class="room-manage">
    <h1>교실 관리</h1>
    <div v-for="room in rooms" :key="room.id">
      <v-text-field label="교실 이름" :value="room.name"></v-text-field>
      <v-textarea outlined name="input-7-4" label="교실 설명" :value="room.description"></v-textarea>
    </div>
    <v-btn color="primary">수정</v-btn>
    <v-btn color="error" to="/">취소</v-btn>
  </div>
</template>

<script>
import api from "Api/functions/timetable";

export default {
  name: "RoomManager",
  data() {
    return {
      rooms: []
    };
  },
  mounted() {
    api.get_comroom(this);
  },
  methods: {}
};
</script>

<style>
.room-manage {
  max-width: 60%;
  margin: auto;
}
</style>