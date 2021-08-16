<template>
  <p>
    <br />주문이 완료되었습니다.
    <br />금방 준비해드릴게요 :)
    <br />
    <br />- 느린나무 2호점 -
  </p>
</template>

<script>
export default {
  name: "OrderSuccess",
  created() {
    this.$session.remove("namuRoom");
  }
};
</script>

<style>
p:first-child {
  text-align: center;
  font-size: 1.3em;
}
</style>