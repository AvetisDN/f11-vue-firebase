<template>
  <div class="container flex flex-col md:flex-row gap-x-4 gap-y-3">
    <div class="bg-blueGray-100 flex-grow shadow-md rounded p-4">
      <h2>
        <span class="font-medium opacity-70">User Profile: </span>
        {{ displayName }}
      </h2>
      <div class="p-4">
        <Avatar :displayName="displayName" :photoURL="photoURL" size="big" />
      </div>
      <div
        class="
          p-4
          flex flex-col
          gap-y-1
          max-w-md
          bg-blueGray-300
          mx-auto
          rounded-lg
        "
      >
        <label
          class="
            border
            text-center
            mb-3
            rounded-md
            block
            p-6
            border-blueGray-100
          "
        >
          <h4>Drop files here or Click for browse</h4>
          <input
            type="file"
            accept="image/png, image/jpeg"
            @change="fileInput"
            class="hidden"
          />
        </label>
        <img :src="img" v-if="img" />
        <button class="btn mb-[2px]" @click="fileUpload" :disabled="!valid">
          Upload
        </button>
        <Alert :message="errorMsg" type="error" v-if="errorMsg" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { mapActions, mapGetters, useStore } from "vuex";
import Avatar from "../components/Avatar.vue";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { updateProfile, getAuth } from "firebase/auth";
import Alert from "../components/Alert.vue";

export default {
  setup() {
    const file = ref(null);
    const img = ref(null);
    const valid = ref(false);
    const errorMsg = ref("");

    let metaData, filePath;

    async function fileInput(e) {
      const fr = new FileReader();
      const frURL = new FileReader();
      file.value = e.target.files[0];
      if (file.value.size <= 1024 * 1024) {
        errorMsg.value = "";
        valid.value = true;
        fr.readAsBinaryString(file.value);
        fr.addEventListener("load", () => {
          filePath = `avatars/${Date.now()}-${file.value.name}`;
          metaData = { contentType: file.value.type };
        });
        frURL.readAsDataURL(file.value);
        frURL.addEventListener("load", () => {
          img.value = frURL.result;
        });
      } else {
        valid.value = false;
        errorMsg.value = "File is tooooooooo big. 1M is max";
      }
    }

    function fileUpload() {
      const storage = getStorage();
      const fileRef = storageRef(storage, filePath);

      uploadBytes(fileRef, file.value, metaData).then((snapshot) => {
        img.value = null;
        file.value = null;
        valid.value = false;

        getDownloadURL(fileRef)
          .then((url) => {

            const vuexStore = useStore()
            vuexStore.dispatch('setPhoto', url)
            const auth = getAuth();
            updateProfile(auth.currentUser, {
              photoURL: url,
            }).then(() => {
            });
          })
          .catch((error) => {
            // Handle any errors
          });
      });
    }

    return { file, errorMsg, fileInput, fileUpload, img, valid };
  },
  computed: {
    ...mapActions(["setPhoto"]),
    ...mapGetters(["displayName", "photoURL"]),
  },
  components: { Avatar, Alert },
};
</script>