<template>
  <div>
    <div class="row mt-5">
      <div class="col-12 text-center">
        <h3>G-suite 유저 생성용 csv파일 생성기</h3>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12">
        <p class="text-muted">
          충북 G-suite 관리자 계정으로 사용자 계정을 생성할 때 사용합니다.<br />
          사용방법은 <a href="http://ssamko.tistory.com/17">(반별)</a> /
          <a href="https://ssamko.tistory.com/20">(학교전체)</a> 를
          참고해주세요😉<br />
          <!-- 해당 페이지는 데스크탑에서 정상 작동합니다. -->
        </p>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-12">
        <form action="" method="post" enctype="multipart/form-data">
          <input type="checkbox" name="whole_school" id="whole_school" hidden />
          <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
              <a
                :class="{ 'nav-link': true, active: showEachClass }"
                href="#"
                @click="each_class"
                >반별</a
              >
            </li>
            <li class="nav-item">
              <a
                :class="{ 'nav-link': true, active: !showEachClass }"
                href="#"
                @click="whole_school"
                >학교전체</a
              >
            </li>
          </ul>
          <div class="input-group mb-3 mt-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="school-span">학교명</span>
            </div>
            <input
              type="text"
              name="school"
              id="school"
              class="form-control"
              placeholder="학교명 전체를 입력해주세요. 예) 섭섭초등학교"
              aria-label="학교명"
              aria-describedby="school-span"
            />
          </div>

          <div
            id="each_class"
            class="row"
            style="display: flex"
            v-if="showEachClass"
          >
            <div class="col-6">
              <div class="input-group mb-3">
                <input
                  type="number"
                  class="form-control"
                  placeholder="학년"
                  aria-label="학년"
                  aria-describedby="grade"
                  name="grade"
                  id="input_grade"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text" id="grade">학년</span>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-3">
                <input
                  type="number"
                  class="form-control"
                  placeholder="반"
                  aria-label="반"
                  aria-describedby="classN"
                  name="classN"
                  id="input_classN"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text" id="classN">반</span>
                </div>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupFileAddon01"
                >명렬표</span
              >
            </div>
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                name="roll_file"
                id="roll_file"
                aria-describedby="inputGroupFileAddon01"
                required
              />
              <label class="custom-file-label" for="roll_file"
                >파일 업로드 (.xlsx)</label
              >
            </div>
          </div>
          <button
            type="buttonn"
            class="btn btn-primary"
            id="gs_convert"
            @click="onSubmit"
          >
            변환
          </button>
        </form>
      </div>
    </div>
    <div class="row mt-5" v-if="fileExist">
      <div class="col-12">
        <a :href="resultUrl">파일 받기 </a>

        <a :href="resultUrl">{{ result_url.title }}</a>
      </div>
    </div>
    <div class="alert alert-danger mt-3" role="alert" v-if="errors != ''">
      {{ errors }}
    </div>
  </div>
</template>


<script>
document
  .querySelector(".custom-file-input")
  .addEventListener("change", function (e) {
    var fileName = document.getElementById("roll_file").files[0].name;
    var nextSibling = e.target.nextElementSibling;
    nextSibling.innerText = fileName;
  });
</script>
<script>
export default {
  name: "g-suite",
  data() {
    return {
      fileTitle: "Good",
      resultUrl: "",
      errors: "",
      showEachClass: true,
      fileExist: false,
    };
  },
  methods: {
    whole_school() {
      this.showEachClass = false;
    },
    each_class() {
      this.showEachClass = true;
    },
    onSubmit() {
      let formData = new FormData();
      formData.append("school", this.school);
      formData.append("grade", this.grade);
      formData.append("classN", this.classN);
      formData.append("roll_file", this.$refs.roll_file.files[0]);
      formData.append("whole_school", this.whole_school);
      axios
        .post("/api/g-suite/convert", formData)
        .then((response) => {
          this.result = response.data.result;
          this.result_url = response.data.resultUrl;
          this.file_exist = true;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>