<script setup>
    defineProps({
        detail: String,
        detailType: String,
        editMode: Boolean
    })

    const emits = defineEmits([
        'save'
    ])
    let newValue = ref(null)
    

    function setValue(val) {
        newValue.value = val
        emits('save', newValue.value)
    }
</script>
<template>
    <div
    class="rounded-2xl my-4 shadow-lg w-3/4 mx-auto border-khaki border-2 text-center delay-[1000ms] details-box bg-white">
        <div v-if="!editMode">
            <p v-if="detail === 'FEMALE' && detailType === 'gender'" class="text-center p-6">
                She / Her
                <i class="fa fa-female" />
            </p>
            
            <p v-else-if="detail === 'MALE' && detailType === 'gender'" class="text-center p-6">
                He / Him
                <i class="fa fa-male" />
            </p>
            
            <p v-else-if="detail === 'OTHER' && detailType === 'gender'" class="text-center p-6">
                They / Them
                <i class="fa fa-user" />
            </p>

            <p v-else-if="detailType === 'birthdate'" class="text-center p-6">
                Born on {{ new Date(detail).toDateString() }}
                <br />
                {{ parseInt(( new Date().getTime() - new Date(detail).getTime()) / (1000*60*60*24*365)) }} years old
            </p>
            
            <p v-else-if="detailType === 'registrationTimestamp'" class="text-center p-6">
                Joined WiGlobe on {{ new Date(detail).toDateString() }}
            </p>

            <p v-else-if="detailType === 'residence'" class="text-center p-6">
                From {{ detail?.name }}, {{ detail?.country?.name }}
            </p>
            
        </div>
        <div v-else>
            <div v-if="detailType === 'gender'" class="w-fit mx-auto">
                <i class="fa fa-female p-2"/>
                <input
                @change="$emit('set-value', newValue)"
                v-model="newValue"
                name="gender"
                value="FEMALE"
                type="radio"
                class="border rounded-full px-2 my-4 focus:outline-none"/>

                <i class="fa fa-male p-2 ml-6"/>
                <input
                @change="$emit('set-value', newValue)"
                v-model="newValue"
                name="gender"
                value="MALE"
                type="radio"
                class="border rounded-full px-2 my-4 focus:outline-none"/>

                <i class="fa fa-user p-2 ml-6"/>
                <input
                @change="$emit('set-value', newValue)"
                v-model="newValue"
                name="gender"
                value="OTHER"
                type="radio"
                class="border rounded-full px-2 my-4 focus:outline-none"/>
            </div>

            <p v-else-if="detailType === 'birthdate'" class="text-center p-6">
                Born on <input type="date"
                               v-model="newValue"
                               @change="$emit('set-value', newValue)" />
                <br />
                <span v-if="newValue">
                    {{ parseInt(( new Date().getTime() - new Date(newValue).getTime()) / (1000*60*60*24*365)) ?? 0 }}
                </span>
                <span v-else> _ </span> 
                years old
            </p>
            
            <p v-else-if="detailType === 'registrationTimestamp'" class="text-center p-6">
                Joined WiGlobe on {{ new Date(detail).toDateString() }}
            </p>
            
            <p v-else-if="detailType === 'residence'" class="text-center p-6">
                From 
                <DestinationSearchBar @choose-destination="(val) => $emit('set-value', val)" />
            </p>
            
        </div>    
    </div>
    
</template>
<style scoped>
    input {
        cursor: pointer;
    }

</style>