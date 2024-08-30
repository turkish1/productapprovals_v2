const evaluating = ref(false);

const tiles = reactive({
    manufacturer: '',
    material: '',

});

const underlayment = reactive({
    umanufacturer: '',
    umaterial: '',
    udescription: ''
});

const selfadhered = reactive({
    manufacturer: '',
    material: '',
    system: [],
    designPressure: [],
    description: '',
    Description_F1: '',
    Description_F2: '',
    Description_F3: '',
    Description_F4: '',
    Description_F5: '',
    Description_F6: '',
    Description_F7: '',
    arraySystem: [],
    // maps: [],
    systemCheck: []
});

let roofArea = ref(roofList._object.roofList);

let data = ref();
let datasystemf = ref();
let datasbs = ref();

let udlInput = ref(null);
let saInput = ref(null);
let noaInput = ref(null);

const dims = reactive({
    area: '',
    height: ''
});

const selSytem = ref();
const selfAdData = ref([]);
//  This goes in the systemtype ref({ name: array })
const array = ref([]);
const selectedsystemf = ref(null);
const systemtype = ref(selfadhered.system);
const descriptionSAdata = ref([]);



const desc = ref(false);
const { inputsystem, takef } = useTileSystemF();

const type = ref([{ name: '--Select Deck Type--' }, { name: '- 5/8" Plywood -' }, { name: '- 3/4" Plywood -' }, { name: '- 1" x 6" T & G -' }, { name: '- 1" x 8" T & G -' }, { name: '- Existing 1/2" Plywood -' }]);
const descSystem = ref([]);
function addFSystem() {
    selfadhered.system = selfadhered.arrSystem;
    console.log(typeof selfadhered.arrSystem, typeof selfadhered.system);
}
function valueEntered() {
    if (slope.value) {
        let slopeNumber = Number(slope.value);
        console.log(slopeNumber);

        if (slopeNumber < 2) {
            isSlopeValid = false;
        }
        if (slopeNumber >= 2 && slopeNumber <= 4) {
            isSlopeValid = true;
            isSlopeLessFour.value = true;
            isSelectVisible1 = true;
            isSelectVisible2 = false;
        }
        if (slopeNumber > 4 && slopeNumber <= 12) {
            isSlopeValid = true;
            isSlopeMoreFour.value = true;
            isSelectVisible2 = true;
            isSelectVisible1 = false;
        }

        if (slope.value === '') {
            isSlopeValid.value = false;
            isSlopeLessFour.value = false;
            isSlopeMoreFour.value = false;
        }
    } else {
        console.log('Not Mounted');
    }
}

function getIndexs() {
    console.log(selectedSlopelow);

    if (selectedSlopelow.value === '2 Plies ASTM # 30 with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c' || selectedSlopehigh.value === '1 Ply ASTM # 30 with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c') {
        isUDLNOAValid = false;
        isSAValid = false;
        isShingleValid = true;
    }
    if (selectedSlopelow.value === '2 Plies Polypropylene with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c' || selectedSlopehigh.value === '1 Ply Polypropylene with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c') {
        isUDLNOAValid = true;
        isSAValid = false;
        isShingleValid = true;
    }

    if (selectedSlopelow.value === '(S/A) membrane adhered directly to a wood deck, per the NOA system F' || selectedSlopehigh.value === '(S/A) membrane adhered directly to a wood deck, per the NOA system F') {
        isUDLNOAValid = false;
        isSAValid = true;
        isShingleValid = true;
    }

    if (selectedSlopelow._rawValue === null) {
        console.log('Not Mounted');
    }
}
function updateselectSystem() {
    selSytem.value = Object.entries(selectedsystemf).map((obj) => {
        const val = obj[1];
        // console.log(val, typeof selfadhered.Description_F1, selfadhered.Description_F1, selfAdData.value);

        if (val === 'F1') {
            selfadhered.sadescription = selfadhered.Description_F1;
        }
        if (val === 'F2') {
            selfadhered.sadescription = selfadhered.Description_F2;
        }
        if (val === 'F3') {
            selfadhered.sadescription = selfadhered.Description_F3;
        }
        if (val === 'F4') {
            selfadhered.sadescription = selfadhered.Description_F4;
        }
        if (val === 'F5') {
            selfadhered.sadescription = selfadhered.Description_F5;
        }
        if (val === 'F6') {
            selfadhered.sadescription = selfadhered.Description_F6;
        }
        if (val === 'F7') {
            selfadhered.sadescription = selfadhered.Description_F7;
        }
    });
}

function setRoofInputs() {
    roofArea.value.forEach((item, index) => {
        dims.area = item.dim1;
    });
}
const dimensions = onMounted(() => {
    setRoofInputs();
});
// selectedsystemf, on watch affect
watchEffect( slopetypeless, slopetypemore, udlInput, getIndexs, selectedSlopelow, selectedSlopehigh, setRoofInputs, grabInput, () => {});

watch(
    addFSystem,
    updateselectSystem,
    valueEntered,
    noaInput,
    whatChanged,
    udlInput,
    roofArea,
    dimensions,
    grabInput,

    inputsystem,

    datasbs,

    checkInput,
    setRoofInputs,

    () => {}
);



const whatChanged = computed(() => {
    checkInput();

    checkInputPoly();
});

function grabInput() {
    data.value = noaInput.value;
    datasbs.value = saInput.value;
    datapoly.value = udlInput.value;
    datasystemf.value = saInput.value;

    if (noaInput.value !== null) {
        // 18061905

        takeValue(data.value);
    }
    if (saInput.value !== null) {
        takef(datasystemf.value);
    }
    if (udlInput.value !== null) {
        //  17040522

        takp(datapoly.value);
    }
}
/*
function checkInputPoly() {
    if (polydatamt.value.length !== null) {
        polydatamt.value.forEach((item, index) => {
            underlayment.umanufacturer = item.polyData.applicant;
            underlayment.umaterial = item.polyData.material;
            underlayment.udescription = item.polyData.description;
        });
    }
}

function checkInputSystem() {
    systemdatamt.value.forEach((item, index) => {
        selfadhered.samanufacturer = item.systemData.manufacturer;
        selfadhered.samaterial = item.systemData.material;
        selfadhered.Description_F1 = item.systemData.Description_F1;
        selfadhered.Description_F2 = item.systemData.Description_F2;
        selfadhered.Description_F3 = item.systemData.Description_F3;
        selfadhered.Description_F4 = item.systemData.Description_F4;
        selfadhered.Description_F5 = item.systemData.Description_F5;
        selfadhered.Description_F6 = item.systemData.Description_F6;
        selfadhered.Description_F7 = item.systemData.Description_F7;
        selfadhered.arrSystem = item.systemData.arraySystem;
        console.log(selfadhered.arrSystem.length);
        if (selfadhered.arrSystem.length > 1) {
            //    23111506
            addFSystem();
            console.log('condition met');
        } else {
            selfadhered.system = item.systemData.system;
            // selfAdData.value = item.systemData.description;
            selfadhered.Description_F1 = item.systemData.description;
            // if ((selfadhered.Description_F1 = '')) {
            //     selfadhered.sadescription = selfAdData.value;
            // }
        }
    });
}
*/

/*
// function checkInput() {
//     if (datamounted.value.length !== null) {
//         datamounted.value.forEach((item, index) => {
//             console.log(item.shingleData, index);
//             shingles.manufacturer = item.shingleData.applicant;
//             shingles.material = item.shingleData.material;
//             shingles.description = item.shingleData.description;
//         });
//     }
// }
