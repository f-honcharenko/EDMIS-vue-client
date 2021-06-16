import Vue from 'vue'
import App from './App.vue'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Login from './components/Login'
import PersonalPage from './components/LK'
import Profile from './components/Profile'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import MessegesBySender from './components/MessegesBySender'
import MessegesByRecepient from './components/MessegesByRecepient'
import Analytics from './components/Analytics'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$nodeLink = 'http://localhost:5000'; //DEV
// Vue.prototype.$nodeLink = 'https://new-fit-backend-302612.nw.r.appspot.com'; //PRODUCTION
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.use(VueRouter);
const routes = [{
    path: '/',
    component: Login
  },
  {
    name: "login",
    path: '/login',
    component: Login
  },
  {
    name: "mainPage",
    path: '/main',
    component: PersonalPage
  },
  {
    name: "profile",
    path: '/profile',
    component: Profile
  },
  {
    name: "users",
    path: '/users',
    component: Users
  },
  {
    name: "userInfo",
    path: '/userInfo',
    component: UserInfo
  },
  {
    name: "MessegesBySender",
    path: '/messeges',
    component: MessegesBySender
  },
  {
    name: "MessegesByRecepient",
    path: '/messeges',
    component: MessegesByRecepient
  },
  {
    name: "Analytics",
    path: '/analytics',
    component: Analytics
  },

];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')