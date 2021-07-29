<template>
  <div>
    <div class="row mt-5">
      <div class="col-12 text-center">
        <textarea class="form-control" rows="10" readonly>{{ privacy }}</textarea>
        <br />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <a href="/" role="button" class="btn btn-outline-secondary btn-block">취소</a>
      </div>
      <div class="col-6">
        <a href="/school/register" role="button" class="btn btn-outline-primary btn-block">동의</a>
      </div>
    </div>
  </div>
</template>

<script>
import Privacy from "!raw-loader!@/assets/com_privacy.txt";

export default {
  name: "PrivacyConsent",
  data() {
    return {
      privacy: Privacy
    };
  },
  created() {
    // this.readText();
  },
  methods: {
    readText() {
      const reader = new FileReader();
      reader.onload = res => {
        this.privacy = res.target.result;
      };
      reader.onerror = err => {
        console.log(err);
      };
      reader.readAsText(Privacy);
    }
  }
};
</script>