<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <div class="form">
      <label class="form-label" for="#email">Usuario:</label>
      <input class="form-input" 
      v-model="user"
      type="text" id="user"  placeholder="Usuario">
      <label class="form-label" for="#password">Contraseña:</label>
      <input class="form-input"
      v-model="pass"
       type="password" id="password" placeholder="Contraseña">
      <button class="submit"  @click="enter()" >Login</button>
      <br>
<router-link to="/register" class="form-input">Registrarse</router-link>    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref  } from 'vue';
 import axios from 'axios';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
export default {
setup(){
  localStorage.removeItem('user');
    localStorage.removeItem('isAuth');
  const pass=ref();
  const user=ref();
        const store=useStore();
        const acc=computed(()=>store.state.id);
    const route = useRouter();
 
    function enter(){
 

  console.log(pass.value,user.value);
              
         
         axios
         .get(
         `http://localhost:58683/api/usuario/GetUser/${pass.value}`
         
         )
         .then((response) => {
           /* eslint-disable camelcase */ /* eslint-disable camelcase */
        console.log(response);
        const{contrasena,idusuario}=response.data;
        console.log(contrasena);
if(pass.value===contrasena){route.replace('/insertinfo');

  store.commit("SET_USER",idusuario);
}else{
  alert("USUARIO Y/O CONTRASEÑA INVALIDA");
}
        
         });
    }


 onMounted(() => {
     
    //   axios
    //     .get(
    //       'http://localhost:58683/api/usuario',
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       },
    //     )
    //     .then((response) => {
    //       /* eslint-disable camelcase */ /* eslint-disable camelcase */
    //      console.log(response);
    //     });
    });

    return{enter,
    pass,user,
    acc,
    }
}

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