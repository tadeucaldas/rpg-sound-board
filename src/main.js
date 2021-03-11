import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@/assets/fa/css/all.min.css'

Vue.config.productionTip = false

new Vue({
  icons: {
    iconfont: 'fa',
  },
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
