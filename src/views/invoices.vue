<template>
  <div id="nav">
    <router-link to="/insertinfo">Cargar</router-link> |
    <router-link to="/invoices">Ver Recibos</router-link>|
 
   
       <router-link to="/" @click="cerrar()">Cerrar Sesion</router-link>

  </div>
  <div class="login">
    <h1 class="title">Recibos</h1>
    <div class="form">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Proveedor</th>
            <th scope="col">Monto</th>
            <th scope="col">Moneda</th>
            <th scope="col">Fecha</th>
            <th scope="col">Comentario</th>
            <th scope="col">Editar</th>
            <th scope="col">Borrar</th>
          </tr>
        </thead>
        <tr v-for="(invoice, index) in arrInvoices" :key="index">
          <td style="color: #ff0000"><input v-model="invoice.proveedor" /></td>
          <td><input v-model="invoice.monto" /></td>
          <td>
            <select
              name="monedas"
              @change="
                $emit('update:monedas', $event.target.value),
                  check($event.target.value)
              "
            >
              <option value="">Selecciona una opción</option>
              <option
                v-for="item of monedas"
                :value="item"
                :key="item"
                :selected="invoice.moneda === item"
              >
                {{ item }}
              </option>
            </select>
          </td>
          <td>
            <input type="date" v-model="invoice.fecha" placeholder="Fecha" />
          </td>
          <td>
            <textarea
              v-model="invoice.comentario"
              id=""
              cols="20"
              rows="6"
            ></textarea>
          </td>
          <td>
            <button
              class="btn btn-danger form-control delete-product-row"
              role="button"
              type="button"
              @click="
                Update(
                  invoice.idrecibo,
                  invoice.proveedor,
                  invoice.monto,
                  invoice.moneda,
                  invoice.fecha,
                  invoice.comentario
                )
              "
            >
              Editar
            </button>
          </td>
          <td>
            <button
              class="btn btn-danger form-control delete-product-row"
              role="button"
              type="button"
              @click="del(invoice.idrecibo)"
            >
              Borrar
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
 
</template>

<script>
import { onMounted, computed, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const monedas = ref(["MXN", "USD"]);
    const store = useStore();
    const user = computed(() => store.state.id);
    const route = useRouter();
    const arrUpdate = ref({});
    const select = ref();
    const testValue = ref(0);
    const arrInvoices = ref([]);
const countError=ref();
    async function getInvoices() {
       //GET invoices 
         //Only change localhost & port
          //the database is in the cloud
      await axios
        .get(`http://localhost:58683/api/recibo/${user.value}`)
        .then((response) => {
          console.log(response);
          response.data.forEach((element) => {
            arrInvoices.value.push({
              idusario: element.idusario,
              idrecibo: element.idrecibo,
              proveedor: element.proveedor,
              monto: element.monto,
              moneda: element.moneda,
              fecha: element.fecha,
              comentario: element.comentario,
            });
          });
          console.log(arrInvoices.value);
        }).catch(()=>{

           alert("VERIFIQUE LA CONEXCION")
         })
    }
    async function del(params){
       //delete invoice 
         //Only change localhost & port
          //the database is in aws
       await axios
        .delete(`http://localhost:58683/api/recibo/${params}`)
        .then((response) => {console.log(response);
        arrUpdate.value = {};
      testValue.value = "";
      select.value = "";
      arrInvoices.value = [];
      getInvoices();}).catch(()=>{

           alert("VERIFIQUE LA CONEXCION")
         })

    }
    function check(params) {
      console.log(params);
      select.value = params;
    }
   async function Update(p1, params1, params2, p2, params3, params4) {
      console.log(p1, params1, params2, p2, params3, params4);

      if (select.value !== "") {
        testValue.value = select.value;
      }
      if (p2 !== "") {
        testValue.value = p2;
      }

      if (p1 === "") {
        countError.value+=1;
      }
      if (params1 === "") {
        countError.value+=1;
      }
      if (params2 === "") {
        countError.value+=1;
      }
      if (p2 === "") {
        countError.value+=1;
      }
      if (params3 === "") {
        countError.value+=1;
      }
      if (params4 === "") {
        countError.value+=1;
      }

if(countError.value ===0){ 
      arrUpdate.value = {
        idusario: user.value,
        idrecibo: p1,
        proveedor: params1,
        monto: params2,
        moneda: testValue.value,
        fecha: params3,
        comentario: params4,
      };
 //Update invoice in DB =>exec action
         //Only change localhost & port
          //the database is in the cloud
         await axios
        .put(`http://localhost:58683/api/recibo/`,arrUpdate.value)
        .then((response) => {console.log(response);}).catch(()=>{

           alert("VERIFIQUE LA CONEXCION")
         })

      console.log(arrUpdate.value);
      arrUpdate.value = {};
      testValue.value = "";
      select.value = "";
      arrInvoices.value = [];
      getInvoices();}
      else{
        alert("NO SE PUEDEN INSERTAR CAMPOS VACIOS")
        countError.value=0
      }
    }
    function enter() {
      route.replace("/");
      // window.location.href = '/home'
    }

    function updateInvoice() {
      arrUpdate.value = {};
    }

    onMounted(() => {
      getInvoices();
    });
  function cerrar() {
        store.commit("SET_USER",0);
     }
    return { enter, cerrar,check, arrInvoices, monedas, Update, updateInvoice,del};
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
  min-width: 950px;
  max-width: 9000px;
  background: none;
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