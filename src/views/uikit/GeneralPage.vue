<script setup>
import CadViewer from '@/components/Editor/CadViewer.vue';
// import FileSystem from '@/components/FileSystem/FileSystem.vue';
import { useGlobalState } from '@/stores/accountsStore';
import { useGeneralpdfStore } from '@/stores/generalpageStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
// import { invoke, until } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';
// defineAsyncComponent,
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const permitstore = usePermitappStore();
const { permitapp } = storeToRefs(permitstore);
const store = useRoofListStore();
const { roofList } = storeToRefs(store);
const router = useRouter();
const generalpageStore = useGeneralpdfStore();
const { accountUsers } = useGlobalState();

// const stepGeneralPagePDF = defineAsyncComponent(() => import('@/components/jsPDF/Generalpagepdf.vue'));

// const availableComponentsPDF = [stepGeneralPagePDF];

let total = ref('');
let low1 = ref('');
let steep1 = ref('');
const steep = ref('');
let lowslope = ref('');
let steep2 = ref('');
let steep3 = ref('');
let steep4 = ref('');
let checkedmtile = ref(false);
let checkedadtile = ref(false);
let checkedshingle = ref(false);
let checkedmetal = ref(false);
let isGenaralPageValid = ref(false);
let master = ref();
let process = ref();
let dba = ref();
let jobaddress = ref();
let contractor = ref();

const dataGeneral = {
    steepData: '',
    slopeData: '',
    totalData: '',
    mtileChk: '',
    adtileChk: '',
    shingleChk: '',
    slopeChk: '',
    metalChk: '',
    roofCheck: ''
};

const checkedslp = ref(false);

onMounted(() => {
    roofList.value.forEach((item, index) => {
        console.log(item.item, index);
        if (item.item === 'Asphalt Shingle') {
            console.log(item.dim1);
            steep1.value = item.dim1;
            checkedshingle.value = true;
            dataGeneral.shingleChk = checkedshingle.value;
        }

        if (item.item === 'Low Slope') {
            low1.value = item.dim2;

            checkedslp.value = true;
            dataGeneral.slopeChk = checkedslp.value;
        }

        if (item.item === 'Mechanical Fastened Tile') {
            steep1.value = item.dim3;
            checkedmtile.value = true;
            dataGeneral.mtileChk = checkedmtile.value;
        }

        if (item.item === 'Adhesive Set Tile') {
            steep2.value = item.dim4;
            checkedadtile.value = true;
            dataGeneral.adtileChk = checkedadtile.value;
        }
        if (item.item === 'Metal Panel') {
            steep3.value = item.dim5;
            checkedmetal.value = true;
            dataGeneral.metalChk = checkedmetal.value;
        }
        if (accountUsers._value[0].DBA === '') {
            console.log(accountUsers._value[0]);
            return null;
        } else {
            dba.value = accountUsers._value[0].dba;
        }
    });
    console.log(accountUsers.value, permitapp.value);
    permitapp.value.forEach((item) => {
        (master.value = item.formdt.permit), (process.value = item.formdt.processNumber), (jobaddress.value = item.formdt.address), (contractor.value = item.formdt.contractor);
    });

    roofArea();
});

const checked = ref(false);
function roofArea() {
    let l1 = Number(low1.value);

    let st1 = Number(steep1.value);
    let st2 = Number(steep2.value);
    let st3 = Number(steep3.value);
    let st4 = Number(steep4.value);
    steep.value = st1 + st2 + st3 + st4;

    lowslope.value = l1;

    total.value = lowslope.value + steep.value;
    dataGeneral.slopeData = lowslope.value;
    dataGeneral.steepData = steep.value;
    dataGeneral.totalData = Number(total.value);
    dataGeneral.roofCheck = checked;
    // console.log(dataGeneral.roofCheck);
    generalpageStore.addgeneralpdfData(dataGeneral);
    isGenaralPageValid.value = true;
}

const steps = ref([
    { component: null } // General Page
]);

const navigateNext = () => {
    router.push('/dynamicstepper');
};
</script>

<template>
    <div id="generalpg" class="grid grid-cols-2 gap-2" style="margin-left: 120px">
        <div class="container">
            <div class="row">
                <div class="flex flex-col mt-4 space-y-6 gap-4">
                    <div class="grid grid-cols-1 gap-1 place-content-center h-6 ...">
                        <p class="text-center font-semibold text-xl" style="color: #122620">2023 HVHZ</p>
                    </div>
                    <div class="grid grid-cols-1 gap-1 place-content-center h-5 ...">
                        <p class="text-center italic font-semibold text-xl" style="color: #122620">mEPermit</p>
                    </div>
                    <div class="grid grid-cols-1 gap-1 place-content-center h-4 ...">
                        <p class="text-center font-semibold text-xl" style="color: #122620">General Information Page</p>
                    </div>

                    <div class="flex flex-wrap gap-12 columns-3">
                        <div class="p-2 flex flex-col md:w-1/3 grow basis-0 gap-3">
                            <label for="master" style="color: #122620">Master Permit</label>
                            <InputText id="master" v-model="master" type="text" planceholder="permit number" />
                        </div>

                        <div class="p-2 flex flex-col p-2 md:w-1/3 grow basis-0 gap-3">
                            <label for="process" style="color: #122620">mEProcess Number</label>
                            <InputText id="process" v-model="process" type="text" planceholder="mEProcess" />
                        </div>

                        <div class="flex flex-col p-2 md:w-1/3 grow basis-0 gap-3">
                            <label for="email1" style="color: #122620">Job Address</label>
                            <InputText id="jobaddress" v-model="jobaddress" type="text" planceholder="" />
                        </div>
                    </div>
                    <div class="flex flex-col p-2 md:w-1/3 gap-3">
                        <label for="dba" style="color: #122620">Licensed DBA Name </label>
                        <InputText id="dba" v-model="dba" type="text" />
                    </div>
                </div>

                <div class="flex flex-wrap mt-4 space-y-6 justify-center gap-6">
                    <div class="flex items-center mt-4 space-y-6">
                        <Checkbox v-model="checked" :invalid="!checked" inputId="newroof" name="checked" value="newroof" />
                        <label for="newroof" class="ml-2" style="color: #122620"> New Roof</label>
                    </div>
                    <div class="flex items-center mt-4 space-y-6">
                        <Checkbox v-model="checked" :invalid="!checked" inputId="reroof" name="checked" value="reroof" />
                        <label for="reroof" class="ml-2" style="color: #122620"> Re-Roof</label>
                    </div>
                </div>

                <div class="flex flex-wrap mt-4 space-y-6 justify-center gap-4">
                    <div class="flex items-left gap-4" style="margin-top: 20px">
                        <label for="slope1" class="ml-2" style="color: #122620">Low Slope</label>
                        <Checkbox v-model="checkedslp" inputId="slope1" name="lowslope" value="Low Slope" severity="contrast" :binary="true" />
                    </div>
                    <div class="flex items-left gap-5">
                        <label for="mtile1" class="ml-2" style="color: #122620"> Mechanical Fastened Tile </label>
                        <Checkbox v-model="checkedmtile" inputId="mtile1" name="mtile" value="Mechanical Fastened Tile" severity="contrast" :binary="true" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label for="adtile1" class="ml-2" style="color: #122620"> Adhesive Set Tile </label>
                        <Checkbox v-model="checkedadtile" inputId="adtile1" name="adtile" value="Mortar/Adhesive Set Tile" severity="contrast" :binary="true" />
                    </div>
                    <!-- <br />
                        <label></label> -->

                    <div class="flex items-center gap-4">
                        <label for="shingle1" class="ml-2" style="color: #122620"> Asphalt Shingle </label>
                        <Checkbox v-model="checkedshingle" inputId="shingle1" name="shingle" value="Asphalt Shingle" severity="contrast" :binary="true" />
                    </div>
                    <div class="flex items-center gap-4">
                        <label for="metal" class="ml-2" style="color: #122620"> Metal Panel </label>
                        <Checkbox v-model="checkedmetal" inputId="metal1" name="metal1" value="metal panel" severity="contrast" :binary="true" />
                    </div>

                    <!-- <label style="margin-left: 50px; margin-top: 30px; color: #122620">Roof Area </label> -->
                </div>
                <Divider />
                <div class="flex items-center space-y-4 gap-4" style="margin-left: 300px">
                    <label style="color: #122620; font-weight: bold">Roof Area: </label>
                    <Label style="color: #122620; font-weight: bold; margin-left: 5px; margin-bottom: 10px">{{ total }}</Label>
                    <!-- <InputText v-model="total" placeholder="Total" /> -->
                </div>
                <Divider />
                <div class="flex flex-col md:w-3/4 mt-4 space-y-6 md:flex-row gap-6">
                    <!-- <div><label for="lowslope" class="ml-1 text-left" style="color: #122620">Low Slope </label></div> -->
                    <label for="" style="margin-top: 20px; color: #122620">Low Slope </label>
                    <InputGroup style="margin-left: 10px">
                        <InputText v-model="lowslope" placeholder="Low Slope" @change="roofArea" />
                        <InputGroupAddon> </InputGroupAddon>
                    </InputGroup>
                    <div class="ml-1 text-left"><label for="" style="color: #122620">Steep Slope </label></div>
                    <InputGroup>
                        <InputNumber v-model="steep" placeholder="Steep Sloped" @change="roofArea" />

                        <InputGroupAddon></InputGroupAddon>
                    </InputGroup>
                    <label for="" class="ml-1" style="color: #122620">Total </label>
                    <InputGroup>
                        <InputGroupAddon>Total</InputGroupAddon>
                        <InputText v-model="total" placeholder="Total" />
                    </InputGroup>
                </div>
                <!-- <div class="md:w-2/3 flex flex-col bg-local hover:bg-fixed gap-4"></div> -->

                <div class="md:w-1/3 flex p-2 mt-8 space-y-8 flex-col gap-2" style="margin-top: 80px">
                    <Button class="w-1/3" type="submit" label="Submit" style="background-color: #a4b5b9" raised as="router-link" to="/dynamicstepper" @click="navigateNext" />
                </div>
            </div>
        </div>

        <div>
            <CadViewer />
        </div>
    </div>
</template>
<style scoped>
.container {
    padding-bottom: 25px;
    padding-top: 50px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 1000px;
    min-width: 900px;
    top: 10vh;
}

.ql-container {
    height: calc(100% - 52px);
}

.editor-layout {
    width: 85%;
    height: 600px;
    border-style: solid;
    border-width: 2px;
    border-color: blue;
    margin-left: 20px;
    padding-bottom: 30px;
}

.pintura-editor {
    --color-background: 255, 255, 255;
    --color-foreground: 0, 0, 0;
    /* --color-background: 255, 255, 255;
    --color-foreground: 10, 10, 10; */
    --editor-max-width: 50em;
    --editor-max-height: 40em;
    --color-preview-outline: 255, 0, 0;
    --color-primary: #2990ff;
    --color-primary-dark: #1a80ec;
    --color-primary-text: #fff;
    --color-secondary: #03a9f4;
    --color-secondary-dark: #046bbf;
    --color-focus: 255, 0, 0;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
    /* html {
        /* color: #fff;
        background: #fff; */
    /* } */

    .pintura-editor {
        --color-background: 10, 10, 10;
        --color-foreground: 255, 255, 255;
        box-shadow: 0 0 0 1px rgba(238, 233, 233, 0.1);
    }
}
</style>
