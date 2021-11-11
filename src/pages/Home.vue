<template>
    <div class="container flex flex-col md:flex-row gap-x-4 gap-y-3">
        <CreatePost/>
        <div class="bg-blueGray-100 flex-grow shadow-md rounded">
            <div class="grid gap-3 p-3 lg:p-4 grid-cols-1 md:grid-cols-2">
                <Kiwi v-for="item, index in kiwi" :key="index" :kiwi="item" />
            </div>
        </div>
    </div>
</template>

<script>
import CreatePost from "../components/CreatePost.vue";
import Kiwi from '../components/Kiwi.vue'
import {getFirestore, collection, query, onSnapshot, orderBy} from 'firebase/firestore'
import { ref } from '@vue/reactivity';
import { onUnmounted } from '@vue/runtime-core';
export default {
    name: "Home",
    setup() {
        const kiwi = ref([])

        const db = getFirestore()

        const q = query(collection(db, 'kiwi'), orderBy('timestamp', 'desc'))

        let tmp = []
        const unsubscribe = onSnapshot(q, (snapshot) => {
            tmp=[]
            snapshot.forEach(doc => {
                tmp.push(doc.data())
            })
            kiwi.value = tmp
        })

        onUnmounted(() => {
            unsubscribe();
        })

        return {kiwi}
    },
    components: { CreatePost, Kiwi }
}
</script>