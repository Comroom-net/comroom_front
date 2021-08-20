<template>
  <div>
    <NamuHeader :room="room" />
    <router-view></router-view>
  </div>
</template>

<script>
import NamuHeader from "@/views/namu/namu_header";

export default {
  name: "Namu",
  components: {
    NamuHeader: NamuHeader
  },
  created() {
    document.title = "느린나무2호점";
    this.$emit("headerChange");
    if (this.$session.has("namuRoom")) {
      this.room = this.$session.get("namuRoom");
    }
  },
  data() {
    return {
      room: ""
    };
  }
};
</script>