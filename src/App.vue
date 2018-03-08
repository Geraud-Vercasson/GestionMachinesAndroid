<template>
  <div id="app">
    <img src="http://www.thelogofactory.com/wp-content/uploads/2015/08/coffee-services-unlimited-logo.png">
    <h1>{{ msg }}</h1>
    <h2 class="red" v-if="error != null"> une erreur est survenue : {{error}}</h2>
    <h2 v-if="loading">Requête en cours</h2>
    <div class="form-group">
      <div class="row">
        <label for="selectMachines" class="col-sm-5">Sélectionnez les machines à afficher</label>
        <select class="form-control col-sm-7" id="selectMachines" v-model="shown">
        <option value="*">Toutes</option>
        <option value="OK">Actives</option>
          <option value="KO">Inactives</option>
        </select>
      </div>
      <div class="row">
        <label for="searchedMachines" class="col-sm-5">Recherche d'une machine</label>
        <input id="searchedMachines" type="text" class="form-control col-sm-5" v-model="search">
        <button class="btn btn-primary col-sm-2" v-on:click="search = ''">Reset</button>

      </div>
    </div>
    <div class="row">
      <router-link to="/list" class="btn btn-primary col-sm-6">Accéder à la liste des machines</router-link>
      <router-link to="/map" class="btn btn-primary col-sm-6">Accéder à la carte des machines</router-link>
    </div>
    <br>
    <div>
      <ajout-machine v-on:success="getMachineList"/>
    </div>
    <router-view :machines="machinesSearchFilter" :position="myPosition" v-on:success="getMachineList"/>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {

    name: 'app',
    data: function () {
      return {
        msg: 'Bienvenue dans la gestion du parc de machines!',
        listeMachines: [], // au début la liste des machines est vide
        searchedListMachines: [],
        loading: false,
        error: null,
        myPosition: {lat: 0, lng: 0},
        shown: '*',
        timer:'',
        search:''
      }
    },
    created() {
      this.getMachineList()
      this.timer = setInterval(this.getMachineList, 60 * 1000)
    },
    methods: {
      machinesFilter(toShow) {
        if (toShow === "OK") {
          return this.searchedListMachines.filter(function (machine) {
            return machine.status === "true"
          })
        }
        else if (toShow === "KO") {
          return this.searchedListMachines.filter(function (machine) {
            return machine.status === "false"
          })
        }
        else if (toShow === "*") {
          return this.searchedListMachines
        }
        else {
          return [];
        }
      },

      getMachineList(){
        this.loading = true
        navigator.geolocation.getCurrentPosition(pos => {
          this.myPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
          console.log(this.myPosition)
        }, error => {
            console.log(error)
        },{ timeout: 30000, enableHighAccuracy: true })
        axios.get('https://machine-api-campus.herokuapp.com/api/machines').then(response => {
          this.loading = false
          this.listeMachines = response.data
          this.searchedListMachines = this.listeMachines
        }).catch(error => {
          this.error = error;
        });

      }
    },
    computed:{
      machinesSearchFilter(){
        return this.machinesFilter(this.shown).filter(myMachine => {
          if(myMachine.hasOwnProperty('name')){
            return myMachine.name.toLowerCase().includes(this.search.toLowerCase())
          }
        })
      }
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: auto;
    margin-top: 60px;
    width: 90%;
    background-color: #f9f9f9f9;
  }

  img {
    width: 200px;
    height: 200px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
  .red{
    color: red;
    font-weight: bold;
    text-transform: uppercase;
  }
</style>
