<template>
<div id="nav">
      <router-link to="/insertinfo">Cargar</router-link> | 
    <router-link to="/invoices">Ver Recibos</router-link> 
  
     
</div>
  <div class="login">
    <h1 class="title">Register</h1>
    <div class="form">
    
    </div>
  </div>
   

</template>

<script>

import { onMounted } from 'vue';
// import axios from 'axios';
import { useRouter } from 'vue-router'
export default {
setup(){
    const route = useRouter()
    function enter(){
              route.replace('/');
         // window.location.href = '/home'
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