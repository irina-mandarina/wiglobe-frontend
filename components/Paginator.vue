<script setup>
    const props = defineProps({
        pageSize: Number,
        pageNumber: Number,
        dataName: String
    })

    const emits = defineEmits([
        'prevPage',
        'nextPage'
    ])

    function prevPage() {
        if (props.pageNumber > 1) {
            emits('prevPage', props.pageNumber - 1)
        }
    }

    
    function nextPage() {
        emits('nextPage', props.pageNumber + 1)
    }
</script>
<template>
    <div>
        <i class="fa fa-chevron-left p-1 mx-2 rounded-full bg-slate-50 text-slate-400" @click="prevPage()" />
        {{ pageNumber }}
        <i class="fa fa-chevron-right p-1 mx-2 rounded-full bg-slate-50 text-slate-400" @click="nextPage()" />
    </div>
</template>