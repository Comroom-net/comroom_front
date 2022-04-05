# 컴룸닷넷 (frontend)

> 학교 컴퓨터실(특별실) 예약관리 사이트

[http://comroom.net](http://comroom.net)

## 함께 개발하실 분을 찾습니다.

- 전국 초등학교에서 사용하는 사이트를 함께 개발해 나가실 선생님(혹은 개발자)을 찾습니다!
- 개발을 잘 못하셔도, 웹 개발이 처음이어도 상관없습니다. 'python'이나 'javascript'를 해보셨다면 공부하면서 기여할 수 있는 부분만 기여해주셔도 충분합니다!
- 비영리 사이트이기 때문에 수익이 없고, 보수도 드리지 못합니다. 다만, 기여를 전혀하지 않고, 질문만 하시는 분도 환영합니다! 공부를 위해, 혹은 단순한 호기심에라도 함께 해주신다면 환영입니다!
- ssamko@kakao.com(이은섭)으로 메일 혹은 카카오톡(ssamko)으로 연락주세요!

## Docker

`docker build -t comroom_front https://github.com/Comroom-net/comroom_front.git#main`

`docker run -p 8080:80 comroom_front`

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
