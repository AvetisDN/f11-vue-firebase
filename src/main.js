import { createApp } from "vue";
import router from "./router";
import store from './store';

import { initializeApp } from "firebase/app"
import {getAuth, onAuthStateChanged} from 'firebase/auth'

import App from "./App.vue";
import './assets/style.css'

const firebaseConfig = {
    apiKey: "AIzaSyDsz7utnq48S0DaTejzi_LdjKuQRykEF3o",
    authDomain: "frontend11-e2a81.firebaseapp.com",
    databaseURL: "https://frontend11-e2a81-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "frontend11-e2a81",
    storageBucket: "frontend11-e2a81.appspot.com",
    messagingSenderId: "204212641827",
    appId: "1:204212641827:web:c646f69d26a6d7cd461196"
};

initializeApp(firebaseConfig);

const auth = getAuth()

let app

onAuthStateChanged(auth, (user) => {
    // console.log(user)
    store.dispatch('setUser', user)
    if(!app) {
        app = createApp(App);
        app.use(router);
        app.use(store);
        app.mount("#app");
    }
})