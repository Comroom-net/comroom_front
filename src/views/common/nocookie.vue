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

      <v-text-field
        v-model="inputUrl"
        placeholder="복사한 유튜브 링크를 붙여넣기 하세요"
        filled
        rounded
        label="원본 유튜브 링크"
      ></v-text-field>
      <div class="buttons">
        <v-btn id="option_title" @click="more_options">{{optionBtnText}}</v-btn>
        <v-btn id="option_reset_btn" @click="reset_options" v-show="showResetBtn">옵션 초기화</v-btn>
      </div>

      <div id="options" class="mt-1" v-show="showMoreOptions">
        <v-text-field v-model="start" label="시작지점" suffix="초" type="number"></v-text-field>
        <v-text-field v-model="end" label="종료지점" suffix="초" type="number"></v-text-field>

        <v-switch v-model="autoplay" label="자동실행(음소거)" color="info" hide-details></v-switch>
        <v-switch v-model="keyboardDisable" label="키보드로 건너뛰기 금지" color="info" hide-details></v-switch>
        <v-switch v-model="showTimeline" label="타임라인 표시" color="info" hide-details></v-switch>
      </div>
      <v-btn @click="convert_url" :disabled="!!!inputUrl">변환</v-btn>
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
        <p class="text-muted" v-for="notice in notices" :key="notice.id">
          <span v-html="notice.notice"></span>
        </p>
      </div>
      <div class="col-sm-4">
        <h6>&lt; embed를 허용하지 않은 채널 &gt;</h6>
        <ul>
          <li v-for="ch in disabledChannels" :key="ch.id">{{ch.ch_name}}</li>
        </ul>
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
import api from "Api/functions/etc";

String.prototype.startsWith = function(str) {
  if (this.length < str.length) {
    return false;
  }
  return this.indexOf(str) == 0;
};

export default {
  name: "Nocookie",
  data() {
    return {
      inputUrl: null,
      showMoreOptions: false,
      showResetBtn: false,
      start: null,
      end: null,
      checkboxOpts: [
        {
          label: "자동실행(음소거)",
          value: false
        },
        {
          label: "키보드로 건너뛰기 금지",
          value: false
        },
        {
          label: "키보드로 건너뛰기 금지",
          value: false
        }
      ],
      keyboardDisable: false,
      showTimeline: true,
      autoplay: false,
      optionBtnText: "옵션 보기",
      notices: [],
      disabledChannels: []
    };
  },
  created() {
    api.getNotice(this);
    api.getDisabledChannel(this);
  },
  methods: {
    convert_url() {
      if (valid_url(this.inputUrl)) {
        const nocookie_prefix = "https://www.youtube-nocookie.com/embed/";
        var temp = this.inputUrl.split("/");
        temp = temp[temp.length - 1];
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
    },
    more_options() {
      this.showMoreOptions = true;
      this.optionBtnText = "옵션 닫기";
      this.showResetBtn = true;
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
    },
    reset_options() {
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
    },
    options() {
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
    },
    valid_url(given) {
      if (!given.startsWith("http")) {
        return false;
      }
      if (!given.includes("you")) {
        return false;
      }

      return true;
    }
  }
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