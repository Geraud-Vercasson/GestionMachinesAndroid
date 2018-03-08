<template>
    <div>
        <h2>Liste des machines</h2>
        <machine class="bordered" v-for="machine in machines" :key="machine.id" :machine="machine" v-on:success="success"/>
    </div>
</template>

<script>
    import Machine from './Machine.vue'
    export default {
        name: "machines-list",
        components: {'machine':Machine},
        props:['machines'],
      methods:{
        success(){
            this.$emit('success')
          }
      }

    }
</script>

<style scoped>
    .bordered {
        border: 2px solid black;
        margin: 10px;
    }
</style>
