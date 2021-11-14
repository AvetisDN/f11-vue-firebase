<template>
    <div class="container flex flex-col md:flex-row gap-x-4 gap-y-3">        
        <div class="bg-blueGray-100 flex-grow shadow-md rounded p-4">
            <h2>
                <span class=" font-medium opacity-70">User Profile: </span>
                {{displayName}}
            </h2>
            <div class="p-4">
                <Avatar :displayName="displayName" :photoURL="photoURL" size="big"/>
            </div>
            <div class="p-4">
                <file-pond
                    name="test"
                    label-idle="Drop image here..."
                    v-bind:allow-multiple="false"
                    accepted-file-types="image/jpeg, image/png"
                    v-bind:files="file"
                    @init="handleFilePondInit"
                />
            </div>
        </div>
    </div>    
</template>

<script>
import { ref } from "@vue/reactivity";
import { mapGetters } from "vuex";
import Avatar from "../components/Avatar.vue";
import {getStorage, ref as storageRef, uploadBytes} from 'firebase/storage'
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
    setup() {
        const file = ref(null)

        function handleFilePondInit() {
            console.log("FilePond has initialized");
        }

        return {file, handleFilePondInit}
    },
    computed: {
        ...mapGetters(["displayName", "photoURL"])
    },
    components: { Avatar, FilePond }
}
</script>