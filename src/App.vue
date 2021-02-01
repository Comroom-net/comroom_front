<template>
  <!--최상단 부모 container entry component -->
  <v-app id="app">
    <!--실제 paging routing시 이 부분에서 페이지 변환이 일어남-->
    <router-view />
    <vue-progress-bar></vue-progress-bar>
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();

    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        this.$Progress.parseMeta(meta);
      }

      this.$Progress.start();
      next();
    });

    this.$router.afterEach((to, from) => {
      this.$Progress.finish();
    });
  }
};
</script>
