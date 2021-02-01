const path = require('path'); //경로 활용 모듈
const ansiRegex = require('ansi-regex'); // IE 구동을 위해 추가한 모듈

module.exports = {
    // publicPath: '/mnt/gdf/pikavue-web',  // 배포 서버 루트 디렉토리

    //개발 서버 구동시 설정
    // devServer: {
    //   host: 'localhost'                           //개발 서버 구동시 사용할 host ip
    // },
    devServer: {
        host: 'localhost',
        port: '8080',
        public: 'localhost:8080',
    },
    //front-end build 시 결과물 생성되는 경로 (프로젝트 루트폴더 기준)
    outputDir: 'dist',

    //webpack 설정 : webpack 설정 docs, vue-cli docs 참고
    configureWebpack: {
        resolve: {

            //프로젝트 내 경로 사용시 별칭 설정
            alias: {
                Api: path.resolve(__dirname, 'src/api/'),
                Components: path.resolve(__dirname, 'src/components/'),
                Views: path.resolve(__dirname, 'src/views/'),
                Plugin: path.resolve(__dirname, 'src/plugins'),

                Constants: path.resolve(__dirname, 'src/constants/'),
                Helpers: path.resolve(__dirname, 'src/helpers/'),
                devtool: 'source-map', // Chrome에서 vue-devtools 활성화 (https://github.com/vuejs/vue-devtools)
                '@': path.resolve(__dirname, 'src/')
            },

            extensions: ['*', '.js', '.vue', '.json']
        }
    },
    transpileDependencies: [ansiRegex, 'vuetify'] // IE 구동을 위해 추가한 모듈

}