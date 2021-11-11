<template>
    <img :src="photoURL" :alt="displayName" class="avatar" :class="size" v-if="photoURL">
    <div v-else class="avatar" :class="size">
        {{displayName.substr(0, 1)}}
    </div>
</template>

<script>
export default {
    props: {
        photoURL: String,
        displayName: String,
        size: String // enum['', 'menu', 'big']
    },
    setup() {
        
    },
}
</script>