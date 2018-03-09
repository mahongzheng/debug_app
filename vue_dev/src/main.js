// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import router from './router'
import { request } from './com/http.js'
import Api from './com/api.js'
import IView from 'iview'
// import 'iview/dist/styles/iview.css'
// 主题
import '@/them/index.less'

import '@/less/com.less'
// import config from './com/config.js'

// 使用 路由
Vue.use(Router)
Vue.use(IView)

// Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$api = Api

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
