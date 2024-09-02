<script setup>
import Drop from '@/components/DropZone/Drop.vue';
import { useGlobalState } from '@/stores/accountsStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { storeToRefs } from 'pinia';
import Checkbox from 'primevue/checkbox';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const permitstore = usePermitappStore();
const { permitapp } = storeToRefs(permitstore);
const store = useRoofListStore();
const { roofList } = storeToRefs(store);
const router = useRouter();

const { accountUsers, getUser, addUser } = useGlobalState();
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
// let checkedslope = ref();
let master = ref();
let process = ref();
let dba = ref();
let jobaddress = ref();
let contractor = ref();

const checkedslp = ref(false);

console.log(roofList, permitapp);

onMounted(() => {
    roofList.value.forEach((item, index) => {
        console.log(item.item, index);
        if (item.item === 'Asphalt Shingle') {
            console.log(item.dim1);
            steep1.value = item.dim1;
            checkedshingle.value = true;
        }

        if (item.item === 'Low Slope') {
            console.log(item.dim2);
            low1.value = item.dim2;
            console.log(low1.value);
            checkedslp.value = true;
        }

        if (item.item === 'Mechanical Fastened Tile') {
            steep1.value = item.dim4;
            checkedmtile.value = true;
        }

        if (item.item === 'Adhesive Set Tile') {
            steep2.value = item.dim3;
            checkedadtile.value = true;
        }
        if (item.item === 'Metal Panel') {
            steep3.value = item.dim5;
            checkedmetal.value = true;
        }
        if (accountUsers._value[0].DBA === '') {
            console.log(accountUsers._value[0].dba);
            return null;
        } else {
            dba.value = accountUsers._value[0].dba;
        }
        // (slope.value = item.formdt.permit), (mtile.value = item.formdt.processNumber), (adtile.value = item.formdt.phone), (mtile.value = item.formdt.email), (shingle.value = item.formdt.contractor);
    });

    permitapp.value.forEach((item, index) => {
        (master.value = item.formdt.permit), (process.value = item.formdt.processNumber), (jobaddress.value = item.formdt.address), (contractor.value = item.formdt.contractor);
    });

    roofArea();
});

function roofArea() {
    let l1 = Number(low1.value);

    let st1 = Number(steep1.value);
    let st2 = Number(steep2.value);
    let st3 = Number(steep3.value);
    let st4 = Number(steep4.value);
    steep.value = st1 + st2 + st3 + st4;

    // + st2 + st3 + st4;

    lowslope.value = l1;
    console.log(steep1.value);
    total.value = lowslope.value + steep.value;
}

const navigateNext = () => {
    router.push('/roofinputsection');
};
</script>

<template>
    <div class="flex flex-col md:flex-row gap-8" style="margin-left: 320px">
        <div class="md:w-3/4">
            <div class="card flex flex-col gap-4">
                <div class="container">
                    <div class="row">
                        <div class="card flex flex-col gap-4">
                            <!-- <div class="font-semibold text-xl">2023 HVHZ</div> -->
                            <div class="grid grid-cols-1 gap-1 place-content-center h-8 ...">
                                <p class="text-center font-semibold text-xl">2023 HVHZ</p>
                            </div>
                            <div class="grid grid-cols-1 gap-1 place-content-center h-7 ...">
                                <p class="text-center italic font-semibold text-xl">mEPermit</p>
                            </div>
                            <div class="grid grid-cols-1 gap-1 place-content-center h-6 ...">
                                <p class="text-center font-semibold text-xl">General Information Page</p>
                            </div>
                            <div class="flex flex-wrap gap-8 columns-3">
                                <div class="flex flex-col grow basis-0 gap-3">
                                    <label for="master">Master Permit</label>
                                    <InputText id="master" v-model="master" type="text" planceholder="permit number" />
                                </div>

                                <div class="flex flex-col grow basis-0 gap-3">
                                    <label for="process">mEProcess Number</label>
                                    <InputText id="process" v-model="process" type="text" planceholder="mEProcess" />
                                </div>

                                <div class="flex flex-col grow basis-0 gap-3">
                                    <label for="email1">Job Address</label>
                                    <InputText id="jobaddress" v-model="jobaddress" type="text" planceholder="" />
                                </div>
                                <div class="flex flex-col min-w-96 gap-2">
                                    <label for="dba">Licensed DBA Name </label>
                                    <InputText id="dba" v-model="dba" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card flex flex-wrap justify-center gap-16">
                        <div class="flex items-center">
                            <Checkbox v-model="newroof" inputId="newroof" name="newroof" value="newroof" />
                            <label for="newroof" class="ml-2"> New Roof</label>
                        </div>
                        <div class="flex items-center">
                            <Checkbox v-model="reroof" inputId="reroof" name="reroof" value="reroof" />
                            <label for="reroof" class="ml-2"> Re-Roof</label>
                        </div>
                    </div>
                    <div class="card flex flex-wrap justify-center gap-4">
                        <div class="flex items-center">
                            <Checkbox v-model="checkedslp" inputId="slope1" name="lowslope" value="Low Slope" severity="contrast" :binary="true" />
                            <label for="slope1" class="ml-2"> Low Slope </label>
                        </div>
                        <div class="flex items-center">
                            <Checkbox v-model="checkedmtile" inputId="mtile1" name="mtile" value="Mechanical Fastened Tile" severity="contrast" :binary="true" />
                            <label for="mtile1" class="ml-2"> Mechanical Fastened Tile </label>
                        </div>
                        <div class="flex items-center">
                            <Checkbox v-model="checkedadtile" inputId="adtile1" name="adtile" value="Mortar/Adhesive Set Tile" severity="contrast" :binary="true" />
                            <label for="adtile1" class="ml-2"> Mortar/Adhesive Set Tile </label>
                        </div>
                        <br />
                        <label></label>

                        <div class="flex items-center">
                            <Checkbox v-model="checkedshingle" inputId="shingle1" name="shingle" value="Asphalt Shingle" severity="contrast" :binary="true" />
                            <label for="shingle1" class="ml-2"> Asphalt Shingle </label>
                        </div>
                        <div class="flex items-center">
                            <Checkbox v-model="checkedmetal" inputId="metal1" name="metal1" value="metal panel" severity="contrast" :binary="true" />
                            <label for="metal" class="ml-2"> Metal Panel </label>
                        </div>
                    </div>
                    <label style="margin-left: 350px">Roof Area </label>
                    <div class="card flex flex-col md:flex-row gap-8">
                        <div><label for="lowslope" class="ml-1 text-left">Low Slope </label></div>

                        <InputGroup>
                            <InputText v-model="lowslope" placeholder="Low Slope" @change="roofArea" />
                            <InputGroupAddon>
                                <i class="pi pi-angle-down"></i>
                            </InputGroupAddon>
                        </InputGroup>
                        <div class="ml-1 text-left"><label for="">Steep Slope </label></div>
                        <InputGroup>
                            <InputNumber v-model="steep" placeholder="Steep Sloped" @change="roofArea" />

                            <InputGroupAddon></InputGroupAddon>
                        </InputGroup>
                        <label for="" class="ml-1">Total </label>
                        <InputGroup>
                            <InputGroupAddon>Total</InputGroupAddon>
                            <InputText v-model="total" placeholder="Total" />
                        </InputGroup>
                    </div>

                    <div class="card md:w-1/3 flex flex-col gap-4">
                        <Button type="submit" label="Submit" severity="contrast" raised @click="navigateNext" />
                    </div>
                    <drop />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    padding-bottom: 30px;
    padding-top: 12px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 500px;
    min-width: 700px;
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
</style>
