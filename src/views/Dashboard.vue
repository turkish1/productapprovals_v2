<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const alertTitle = ref("System's Terms of Use   🚧   👷🏼  🚧  👷🏼   🚧   👷🏼  🚧   👷🏼  🚧 High Velocity Hurricane Zone (HZHZ)");

const router = useRouter();
const val = ref(null);
const saved = ref();
watch(checkRadio, () => {
    console.log(val.value);
});

const navigateNext = () => {
    router.push('/permitapp');
};

function checkRadio() {
    saved.value = val.value;
    console.log(val.value);
}
</script>

<template>
    <div class="card">
        <h1>{{ alertTitle }}</h1>
        <Panel header="Agreement">
            <p class="m-0">It is the applicant's responsiblity to complete this application correctly.</p>
            <p class="m-0">Failure to provide valid permitting information can result in failed inspections and/or cancelation of the permit by the Authority Having Jurisdiction (AHJ).</p>
            <p class="m-0">Double permit fees plus a fine determined by the AHJ issuing the permit, can be required for work without a permit.</p>
            <p class="m-0">Refunds will not be provided by the AHJ issuing the permit, due to errors on the applicant's part.</p>
            <p class="m-0">Any deviations from an approved permit package will require a permit revision.</p>
            <p class="m-0">The permit applicant agrees to comply with these terms of use requirements when obtaining this permit electronically.</p>
        </Panel>

        <!-- <Button type="submit" label="Agree" severity="contrast"  />  @click="$emit('close')" @click.left="routerNext()"-->
        <RadioButton v-model="val" value="agree" variant="filled" :invalid="val === null" severity="contrast" @input="checkRadio" @click="navigateNext" />
        <label for="consent" class="ml-2">Agree</label>
    </div>
</template>
