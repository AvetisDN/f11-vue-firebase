<template>
    <div class="container flex flex-col md:flex-row gap-x-4 gap-y-3">
        <CreatePost/>
        <div class="bg-blueGray-100 flex-grow shadow-md rounded"></div>
    </div>
</template>

<script>
import CreatePost from "../components/CreatePost.vue";
export default {
    name: "Home",
    setup() {
    },
    components: { CreatePost }
}
</script>