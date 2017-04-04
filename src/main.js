import Vue from 'vue'
import App from './App'
//import router from './router'
import vueresource from 'vue-resource'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
import Icon from 'framework7-icons/css/framework7-icons.css'
import Routes from './routes.js'
import Pusher from 'pusher-js'
import Cors from 'cors'



//Vue.http.options.root = 'http://laravel.dev:8080';
Vue.config.productionTip = false
//Vue.use(router)
Vue.use(vueresource)
Vue.http.headers.common['authorization'] = localStorage.getItem('token');
Vue.use(Framework7Vue)
Vue.use(Icon)
//Vue.use(Cors())
Vue.use(require('vue-pusher'), {
    api_key: 'e566743c8d2d940b3849',
    options: {
        encrypted: true,
    }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  framework7: {
    root: '#app',
    routes: Routes
  },
  //router,
  render: h => h(App)
})
