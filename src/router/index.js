import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Message from '@/components/Message'
Vue.use(Router)

export default new Router({
	mode:'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
    	path:'/message',
    	name:'message',
    	component:Message
    }
  ]
})
