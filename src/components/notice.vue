<template>
  <div>
    <h3>공지사항</h3>
    <div class="row mt-5">
      <div class="col-12">
        <ul>
          <!-- {% for notice in notices %} -->
          <li>
            <!-- {{notice.context|safe}} -->
            <!-- <small class="text-muted">- {{notice.last_update|date:"y.n.j"}}</small> -->
            hi
          </li>
          <!-- {% endfor %} -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notice"
};
</script>