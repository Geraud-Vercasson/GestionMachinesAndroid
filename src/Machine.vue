<template>
    <div>
        <h1>Machine {{machine.name}}</h1>
        <h2 :class="{green: machine.status ==='true', red: machine.status === 'false'}">Status {{machine.status ==='true' ? 'OK':'KO'}}</h2>
        <h3>Last time checked : {{machine.checkedAt.toLocaleString()}}</h3>
        <button class="btn btn-danger" v-on:click="deleteMachine">Supprimer</button>
        <editer-machine :machineEdit="machine" v-on:success="success"/>
    </div>
</template>

<script>
    import axios from 'axios'
    import EditerMachine from './EditerMachine'
    export default {
        name: "machine",
        props: ["machine"],
      components: {
        EditerMachine,
        "editer-machine": EditerMachine
      },
      methods:{
        deleteMachine(){
          const url = 'https://machine-api-campus.herokuapp.com/api/machines/' + this.machine.id
          axios.delete(url).then(response =>{
            this.success()
          })
        },
        success(){
          this.$emit('success')
        }

    }
    }
</script>

<style scoped>

    .red {
        color: red;
    }
    .green {
        color: green;
    }
</style>
