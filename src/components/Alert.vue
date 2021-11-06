<template>
    <div class="alert" :class="'alert-' + type">
        {{message}}
    </div>
</template>

<script>
export default {
    props: {
        message: String,
        type: String
    },
    setup() {
        
    },
}
</script>