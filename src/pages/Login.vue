<template>
  <div class="container grid place-items-center">
    <form
      class="
        w-96
        flex flex-col
        gap-y-4
        p-4
        py-5
        lg:p-5
        rounded-sm
        bg-blueGray-100
        shadow-md
        mb-20
      "
      @submit.prevent="login"
    >
      <h3 class="text-center">Sign In</h3>
      <div>
        <input
          type="email"
          name="vuegram-email"
          placeholder="E-Mail"
          v-model="email"
          autocomplete="new-password"
        />
      </div>
      <div class="relative">
        <input
          :type="!showP ? 'password' : 'text'"
          name="vuegram-password"
          placeholder="Password"
          v-model="password"
          autocomplete="new-password"
        />
        <button
          type="button"
          class="absolute p-3 top-0 right-0 text-blueGray-400"
          @mousedown="showP = true"
          @mouseup="showP = false"
        >
          <i class="fas fa-eye" v-if="showP"></i>
          <i class="fas fa-eye-slash" v-else></i>
        </button>
      </div>
      <div class="flex justify-between mt-1">
        <button class="btn" type="submit">Login</button>
        <div class="flex gap-x-2">
          <button
            class="btn px-4 btn-red"
            type="button"
            @click.prevent="loginGoogle"
          >
            <i class="fab fa-google"></i>
          </button>
          <button
            class="btn px-4 btn-gray"
            type="button"
            @click.prevent="loginGithub"
          >
            <i class="fab fa-github"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "vue-router";
import Alert from "../components/Alert.vue";

export default {
  setup() {
    const showP = ref(false);
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const auth = getAuth();
    const router = useRouter();

    const login = () => {
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((res) => {
          router.push("/");
        })
        .catch((err) => {
          error.value = err.message;
        });
    };
    const loginGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          error.value = err.message;
        });
    };
    const loginGithub = () => {
      const provider = new GithubAuthProvider();
      signInWithPopup(auth, provider)
        .then((res) => {
          router.push("/");
        })
        .catch((err) => {
          error.value = err.message;
        });
    };

    return {
      showP,
      email,
      password,
      error,
      login,
      loginGithub,
      loginGoogle,
    };
  },
};
</script>