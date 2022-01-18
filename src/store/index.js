 import { createStore } from 'vuex'

 export default createStore({  state: {
     id:123
   },
   mutations: {
     SET_USER(state,id){
 state.id=id;
     }
   },
   actions: {
     getUser({commit}){
       commit 
     }
   },
   modules: {
  }
 })
