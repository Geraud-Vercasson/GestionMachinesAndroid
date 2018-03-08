import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import MachinesList from './MachinesList.vue'
import MachinesMap from './MachinesMap.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import AjoutMachine from './AjoutMachine.vue'

Vue.component('ajout-machine', AjoutMachine)
Vue.component('app',App)
Vue.use(VueGoogleMaps, {
  load: {
    key: require('../configAPI.json').myAPIkey,
  }
})

Vue.use(VueRouter)

const routes = [
    {path: '/list',
        name:'list',
        component:MachinesList},
    {path: '/map',
        name:'map',
        component:MachinesMap}
]

const router = new VueRouter({
    routes
})

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
