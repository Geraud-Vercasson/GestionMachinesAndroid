<template>
  <span>

  <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="'#editModal'+ machineEdit.id">
    Editer
  </button>

    <!-- Modal -->
  <div class="modal fade" :id="'editModal'+ machineEdit.id" tabindex="-1" role="dialog" aria-labelledby="ajoutModalCenterTitle"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editModalLongTitle">Editer</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form v-on:submit="edit">
          <div class="modal-body">
            <div class="form-group">
              <label for="nomMachineEdit">Nom de la machine</label>
              <input type="text" class="form-control" id="nomMachineEdit" :placeholder="machineEdit.name"
                     v-model="machineEdit.name">
            </div>
            <div class="form-group">
              <label for="latitudeMachineEdit">Latitude</label>
              <input type="text" class="form-control" id="latitudeMachineEdit" placeholder="45.1856964"
                     v-model="machineEdit.latitude">
              <label for="longitudeMachineEdit">Longitude</label>
              <input type="text" class="form-control" id="longitudeMachineEdit" placeholder="5.7287321"
                     v-model="machineEdit.longitude">
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="statusMachineEdit" v-model="machineEdit.status">
              <label class="form-check-label" for="statusMachineEdit">Activée</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </span>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "editer-machine",
    props:['machineEdit'],
    methods:{
      edit(){
        $('#editModal'+ this.machineEdit.id).modal('hide')
        const url = 'https://machine-api-campus.herokuapp.com/api/machines/' + this.machineEdit.id
        this.machineEdit.checkedAt = Date().toString()
        axios.put(url,
          this.machineEdit)
          .then(response =>{
            this.$emit('success')
          })
          .catch(error =>{
            console.log(error)

          })
      }
    }
  }
</script>

<style scoped>

</style>
