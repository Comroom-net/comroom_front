<template>
  <header>
    <b-navbar
      toggleable="lg"
      class="navbar navbar-expand-md navbar-dark fixed-top"
      style="background-color: #5ac18e"
    >
      <b-navbar-brand href="#">느린나무2호점</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item active class="ml-auto">{{room}}</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
export default {
  props: ["room"]
};
</script>

<style>
</style>