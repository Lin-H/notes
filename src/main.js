import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/services/polyfill'
import storage from '@/services/storage'

Vue.config.productionTip = false

Vue.use(MintUI)

// 初始化数据

storage.init().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
