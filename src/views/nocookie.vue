<template>
  <div>
    <div class="row mt-5">
      <div class="col-12 text-center">
        <h3>유튜브 전체화면 링크 변환 - nocookie</h3>
      </div>
    </div>
    <div class="convertor">
      <div class="row mt-2">
        <div class="col-12">
          <h5>링크입력</h5>
        </div>
      </div>
      <input type="text" class="form-control" id="input_url" placeholder="복사한 유튜브 링크를 붙여넣기 하세요" />
      <div class="buttons">
        <button
          id="option_title"
          class="btn btn-sm btn-outline-primary"
          onclick="more_options()"
        >옵션 보기</button>
        <button
          id="option_reset_btn"
          class="btn btn-sm btn-outline-secondary"
          onclick="reset_options()"
          style="display: none;"
        >옵션 초기화</button>
      </div>

      <div id="options" class="mt-1" style="display: none;">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">시작지점</span>
          </div>
          <input type="number" class="form-control" aria-label="start point" id="start" />
          <div class="input-group-append">
            <span class="input-group-text">초</span>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">종료지점</span>
          </div>
          <input type="number" class="form-control" aria-label="end point" id="end" />
          <div class="input-group-append">
            <span class="input-group-text">초</span>
          </div>
        </div>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="autoplay" />
          <label class="custom-control-label" for="autoplay">자동실행(음소거)</label>
        </div>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="disablekb" />
          <label class="custom-control-label" for="disablekb">키보드로 건너뛰기 금지</label>
        </div>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="controls" checked />
          <label class="custom-control-label" for="controls">타임라인 표시</label>
        </div>
      </div>
      <div class="row">
        <button id="convert-btn" class="btn btn-primary mx-auto" onclick="convert_url()">변환</button>
      </div>
      <div class="row mt-3" id="converted_title" style="display: none;">
        <div class="col-12">
          <h5>변환된 링크</h5>
        </div>
      </div>
      <p id="result"></p>
      <div
        id="copied"
        class="alert alert-success mt-3"
        role="alert"
        style="display: none;"
      >클립보드에 복사되었습니다! :)</div>
      <div
        id="wrong_url"
        class="alert alert-danger mt-3"
        role="alert"
        style="display: none;"
      >링크를 확인해주세요 😥</div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <!-- <p class="text-muted">{{ notice.notice|safe }}</p> -->
      </div>

      <div class="col-sm-8">
        혹시 재생 안되는 영상이 있는 채널은 제보해주세요.
        <br />검토 후 공지하겠습니다.
        <form action method="post">
          <div class="input-group mb-3">
            <input
              name="new_ch"
              type="text"
              class="form-control"
              placeholder="채널명"
              aria-label="채널명"
              aria-describedby="button-addon2"
              required
            />
            <div class="input-group-append">
              <button class="btn btn-outline-info" type="submit" id="button-addon2">전송</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
String.prototype.startsWith = function(str) {
  if (this.length < str.length) {
    return false;
  }
  return this.indexOf(str) == 0;
};

function convert_url() {
  var origin = document.getElementById("input_url").value;
  if (valid_url(origin)) {
    var nocookie_prefix = "https://www.youtube-nocookie.com/embed/";
    var temp = origin.split("/");
    var temp = temp[temp.length - 1];
    if (temp.startsWith("watch")) {
      temp = temp.split("=")[1];
      temp = temp.split("&")[0];
      temp = temp.split("?")[0];
    } else {
      temp = temp.split("?")[0];
    }
    var video_id = temp;
    var result = nocookie_prefix + video_id + "?rel=0" + options();
    document.getElementById("result").innerText = result;

    // copy url to clipboard
    var tempElem = document.createElement("textarea");
    tempElem.value = result;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand("copy");
    document.body.removeChild(tempElem);
    document.getElementById("copied").style.display = "block";
    document.getElementById("converted_title").style.display = "block";
    document.getElementById("wrong_url").style.display = "none";
  } else {
    document.getElementById("wrong_url").style.display = "block";
    document.getElementById("copied").style.display = "none";
    document.getElementById("converted_title").style.display = "none";
    document.getElementById("result").innerText = "";
  }
}
function more_options() {
  var x = document.getElementById("options");
  var reset_btn = document.getElementById("option_reset_btn");
  var o_title = document.getElementById("option_title");
  if (x.style.display == "none") {
    x.style.display = "block";
    o_title.innerText = "옵션 닫기";
    reset_btn.style.display = "inline";
  } else {
    x.style.display = "none";
    o_title.innerText = "옵션 보기";
    reset_btn.style.display = "none";
  }
}
function reset_options() {
  var start = document.getElementById("start");
  var end = document.getElementById("end");
  var disablekb = document.getElementById("disablekb");
  var contorls = document.getElementById("contorls");
  var autoplay = document.getElementById("autoplay");
  start.value = NaN;
  end.value = NaN;
  disablekb.checked = false;
  controls.checked = 1;
  autoplay.checked = false;
}
function options() {
  var start = document.getElementById("start");
  var end = document.getElementById("end");
  var disablekb = document.getElementById("disablekb");
  var controls = document.getElementById("controls");
  var autoplay = document.getElementById("autoplay");
  var url_suffix = "";
  if (start.value) {
    url_suffix += "&start=" + start.value;
  }
  if (end.value) {
    url_suffix += "&end=" + end.value;
  }
  if (autoplay.checked) {
    url_suffix += "&autoplay=1&mute=1";
  }
  if (disablekb.checked) {
    url_suffix += "&disablekb=1";
  }
  if (!controls.checked) {
    url_suffix += "&controls=0";
  }

  return url_suffix;
}
function valid_url(given) {
  if (!given.startsWith("http")) {
    return false;
  }
  if (!given.includes("you")) {
    return false;
  }

  return true;
}
export default {
  name: "Nocookie"
};
</script>

<style>
.convertor {
  background-color: #e9f0ec;
  padding: 3px 5px 3px 5px;
}

.alert {
  margin-bottom: 0.3rem;
}

div.buttons {
  margin-top: 5px;
}

div.buttons .btn {
  margin-right: 10px;
}
</style>