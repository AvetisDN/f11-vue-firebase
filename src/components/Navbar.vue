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
        <i class="fas fa-kiwi-bird text-4xl"></i>
        kiwi_gram
      </router-link>
      <nav class="main-menu">
        <router-link to="/" v-if="user"> Home </router-link>
        <router-link to="/profile" v-if="user"> Profile </router-link>
        <router-link to="/register" v-if="!user"> Register </router-link>
        <router-link to="/login" v-if="!user"> Login </router-link>
      </nav>
      <div v-if="!user" class="min-w-[160px] text-right">
        Hello, Guest
      </div>
      <div v-else class="flex gap-x-2 items-center">
        <Avatar :photoURL="photoURL" :displayName="displayName"/>
        <span>Hello, </span>
        <span class="font-bold">
          {{displayName}}
        </span>
        <button class="btn btn-red btn-small ml-4" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { mapGetters, mapState } from "vuex";
import Avatar from './Avatar.vue';
export default {
  components: { Avatar },
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
  computed: {
    ...mapState(['user']),
    ...mapGetters(['displayName', 'photoURL'])
  }
};
</script>