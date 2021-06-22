<template>
  <footer class="footer mt-auto py-3">
    <div class="container">
      <h5>
        <a href="mailto:ssamko@kakao.com">
          <i>ssamko@kakao.com</i>
        </a>
      </h5>
      <p>
        Copyright &#9400;
        <em>이은섭</em>
        2020 - {{ new Date().getFullYear()}}. All Rights Reserved.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>