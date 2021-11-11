<template>
  <div class="bg-blueGray-200 p-4 rounded shadow-md md:w-60 lg:w-72 flex-shrink-0">
    <form @submit.prevent="createKiwi" class="mb-2">
      <div class="flex flex-col sm:flex-row md:flex-col gap-y-3 gap-x-2">
        <div>
          <h3 class="mb-3">Touch a feed</h3>
          <input
            type="text"
            name="postTitle"
            placeholder="Post title..."
            required
            v-model="title"
          />
        </div>
        <div
          class="
            flex-grow flex flex-col-reverse
            sm:flex-col
            md:flex-col-reverse
          "
        >
          <h3
            class="mb-[15px] text-right font-normal text-base"
            :class="content.length === 150 ? 'text-red-600' : ''"
          >
            {{ content.length }} / 150
          </h3>
          <textarea
            required
            name="postContent"
            rows="5"
            class="w-full"
            placeholder="Post content..."
            maxlength="150"
            v-model="content"
          ></textarea>
        </div>
      </div>

      <button class="btn mt-3 w-full">
        addKiwi(<i class="fas fa-kiwi-bird mx-1"></i>);
      </button>
    </form>
    <Alert v-if="message" :message="message" :type="type" />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useStore } from "vuex";
import Alert from "./Alert.vue";

export default {
  setup() {
    const title = ref("");
    const content = ref("");
    const message = ref("");
    const type = ref("");
    const db = getFirestore();

    const store = useStore();

    const user = computed(() => store.state.user);
    const { uid, displayName, photoURL } = user.value;

    const createKiwi = async () => {
      const newKiwi = {
        title: title.value,
        content: content.value,
        uid: uid,
        displayName: displayName,
        photoURL: photoURL,
        timestamp: serverTimestamp(),
      };
      try {
        const docRef = await addDoc(collection(db, "kiwi"), newKiwi);
        title.value = "";
        content.value = "";
        type.value = "success";
        message.value = `Kiwi was successfully created with ID: ${docRef.id}`;
        setTimeout(() => {
          message.value = "";
          type.value = "";
        }, 3000);
      } catch (e) {
        type.value = "error";
        message.value = "Error" + e.message;
        setTimeout(() => {
          message.value = "";
          type.value = "";
        }, 3000);
      }
    };
    return { title, content, message, type, createKiwi };
  },
  components: { Alert },
};
</script>