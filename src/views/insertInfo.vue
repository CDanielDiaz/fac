<template>
  <div id="nav">
    <router-link to="/insertinfo">Cargar</router-link> |
    <router-link to="/invoices">Ver Recibos</router-link> |
    <router-link to="/" @click="cerrar()">Cerrar Sesion</router-link>
  </div>
  <div class="login">
    <h1 class="title">Cargar</h1>

    <div class="form">
      <label class="form-label" for="#Proveedor">Proveedor:</label>
      <input class="form-input" v-model="proveedor" placeholder="Proveedor" />
      <label class="form-label" for="#monto">Monto:</label>
      <input class="form-input" v-model="monto" placeholder="Monto" />
      <label class="form-label" for="#Moneda">Moneda:</label>
  


  <select class="form-select" name="monedas" @change="$emit('update:monedas', $event.target.value),check($event.target.value)">
        <option value="">Selecciona una opción</option>
        <option
            v-for="item of monedas"
            :value="item"
            :key="item"
            :selected="genre === item"
        >
            {{ item }}
        </option>
    </select>




      <label class="form-label" for="#fecha">Fecha:</label>
      <input type="date" v-model="fecha" placeholder="Fecha" />
      <label class="form-label" for="#comentario">Comentario:</label>
      <textarea placeholder="comentario" v-model="comentario"> </textarea>
      <button class="submit" @click="newInvoice(item)">Cargar</button>
    </div>
  </div>
  
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import axios from "axios";
export default {
 
  setup() {
     const monedas = ref([
        'MXN',
        'USD',
    ]);
    const mon=ref();
    const proveedor = ref();
    const monto = ref();
    const moneda = ref();
    const fecha = ref();
    const comentario = ref();
    const arrInvoice = ref({});
    const store = useStore();
    const testValue=ref(0);
    const user = computed(() => store.state.id);
function check(params) {
  console.log(params);
  moneda.value=params;
}
    async function newInvoice() {
   
      if(proveedor.value===undefined){
testValue.value+=1;
      }
      if(monto.value===undefined){
testValue.value+=1;
      }
      if(moneda.value===undefined){
testValue.value+=1;
      }
      if(comentario.value===undefined){
testValue.value+=1;
      }
      if(fecha.value===undefined){
testValue.value+=1;
      }
     if(testValue.value===0){
        arrInvoice.value = {
        
          idusuario: user.value,
          proveedor: proveedor.value,
          monto: monto.value,
          moneda: moneda.value,
          fecha: fecha.value,
          comentario: comentario.value,
        };
        console.log(arrInvoice.value);
         //Create invoice 
         //Only change localhost & port
          //the database is in the cloud
        await axios
          .post(`http://localhost:58683/api/recibo/`, arrInvoice.value)
          .then((response) => {
            /* eslint-disable camelcase */ /* eslint-disable camelcase */
            console.log(response.data);
            let idRecib=response.data;
            alert("EL # DE RECIBO ES " + idRecib)
            idRecib=0
          });
     }else{
       alert("Faltan campos");
       testValue.value=0
     }
    
    }
     function cerrar() {
        store.commit("SET_USER",0);
     }
    return {
      user,
      monedas,
      mon,
      cerrar,
      newInvoice,
      proveedor,
      monto,
      check, 
      moneda,
      fecha,
      comentario,
    };
  },
};
</script>


<style lang="scss" scoped>
.login {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}
.form-select {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: black;
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}
.submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0b9185;
  }
}
</style>