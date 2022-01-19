<template>
  <div class="login">
    <button @click="retornar()" class="submit"><h2>Regresar</h2></button>
    <h1 class="title">Register</h1>
    <div class="form">
      <label class="form-label" for="#email">Usuario:</label>
      <input
        class="form-input"
        type="text"
        v-model="user"
        id="email"
        onkeypress="return event.charCode != 32"
        required
        placeholder="Email"
      />
      <label class="form-label" for="#password">Contraseña:</label>
      <input
        class="form-input"
        v-model="pass"
        type="password"
        onkeypress="return event.charCode != 32"
        id="password"
        placeholder="Password"
      />
      <button class="submit" @click="register()">Registrar</button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {

    const pass = ref();
    const user = ref();
    const arrNewuser=ref({});
    const route = useRouter();

    function register() {
             
      if(user.value!==undefined&&pass.value!==undefined){ 
        console.log(pass.value);
      arrNewuser.value={
        usuario:user.value,
        contrasena:pass.value
      }
      axios
        .post("http://localhost:58683/api/usuario", 
        arrNewuser.value,
       )
        .then((response) => {
          /* eslint-disable camelcase */ /* eslint-disable camelcase */
          console.log(response);
        });

      route.replace("/");
      }
else{
  alert("Faltan Datos")
}
    }
 function retornar(){
route.replace("/");
  }
    onMounted(() => {});

    return { register,retornar, pass, user };
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