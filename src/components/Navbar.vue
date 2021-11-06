<template>
  <header>
    <div
      class="
        container
        flex
        justify-between
        items-center
        flex-col
        md:flex-row
        gap-y-4
      "
    >
      <router-link to="/" class="text-2xl font-bold flex items-center gap-x-2">
        <i class="fab fa-vuejs text-4xl"></i>
        vuegram
      </router-link>
      <nav class="main-menu">
        <router-link to="/"> Home </router-link>
        <router-link to="/register"> Register </router-link>
        <router-link to="/login"> Login </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
export default {
  setup() {
    const auth = getAuth();
    const router = useRouter()
    const logout = () => {
      signOut(auth)
        .then(res => {
          router.push('/login')
        })
    }
    return { logout };
  },
};
</script>