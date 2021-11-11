<template>
    <article class="p-4 shadow bg-white rounded">
        <div class="flex items-center gap-x-3">
            <Avatar :displayName="kiwi.displayName" :photoURL="kiwi.photoURL" size="medium" />
            <div class="flex flex-col">
                <b>{{kiwi.displayName}}</b>
                <i>{{dateView}}</i>
            </div>
        </div>
        <h4>
            {{kiwi.title}}
        </h4>
        <p>
            {{kiwi.content}}
        </p>
    </article>
</template>

<script>
import { ref } from '@vue/reactivity'
import Avatar from './Avatar.vue'
import moment from 'moment' 
import {Timestamp} from 'firebase/firestore'
export default {
  components: { Avatar },
    props: {
        kiwi: Object
    },
    setup(props) {
        const dateView = ref('')
        
        if(Timestamp.now().toDate() - props.kiwi.timestamp.toDate() > 24*3600*1000) {
            dateView.value = moment(props.kiwi.timestamp.toDate()).format('DD.MM.YYYY')
        } else {
            dateView.value = moment(props.kiwi.timestamp.toDate()).fromNow()
        }

        return {dateView}
    },
}
</script>