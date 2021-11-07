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
      @submit.prevent="register"
    >
      <h3 class="text-center">Create an account</h3>
      <div>
        <input
          type="email"
          name="vuegram-email"
          placeholder="E-Mail"
          v-model="email"
          autocomplete="new-password"
        />
      </div>
      <div>
        <input
          type="text"
          name="vuegram-username"
          placeholder="Display Name"
          v-model="username"
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
      <div class="relative">
        <input
          :type="!showCP ? 'password' : 'text'"
          name="vuegram-confirm"
          placeholder="Confirm Password"
          v-model="confirm"
          autocomplete="new-password"
        />
        <button
          type="button"
          class="absolute p-3 top-0 right-0 text-blueGray-400"
          @mousedown="showCP = true"
          @mouseup="showCP = false"
        >
          <i class="fas fa-eye" v-if="showCP"></i>
          <i class="fas fa-eye-slash" v-else></i>
        </button>
      </div>
      <div class="flex justify-between mt-1">
        <div class="flex gap-x-2">
          <button
            class="btn px-4 btn-red"
            type="button"
            @click.prevent="registerGoogle"
          >
            <i class="fab fa-google"></i>
          </button>
          <button
            class="btn px-4 btn-gray"
            type="button"
            @click.prevent="registerGithub"
          >
            <i class="fab fa-github"></i>
          </button>
        </div>
        <button class="btn" type="submit">Register</button>
      </div>
      <Alert v-if="error !== ''" :message="error" type="error" />
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
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "vue-router";
import Alert from "../components/Alert.vue";

export default {
  setup() {
    const showP = ref(false);
    const showCP = ref(false);
    const email = ref("");
    const username = ref("");
    const password = ref("");
    const confirm = ref("");
    const error = ref("");
    const auth = getAuth();
    const router = useRouter();
    const register = () => {
      if (password.value === confirm.value) {
        createUserWithEmailAndPassword(auth, email.value, password.value)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: username.value,
            }).then(() => {
              router.push("/");
            });
          })
          .catch((err) => {
            error.value = err.message;
          });
      } else {
        error.value = "Password and Confirm Password must be equal";
      }
    };
    const registerGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          error.value = err.message;
        });
    };
    const registerGithub = () => {
      const provider = new GithubAuthProvider();
      signInWithPopup(auth, provider)
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          error.value = err.message;
        });
    };
    return {
      showCP,
      showP,
      email,
      password,
      confirm,
      error,
      username,
      register,
      registerGithub,
      registerGoogle,
    };
  },
  components: { Alert },
};
</script>