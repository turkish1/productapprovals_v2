const latestUDL = computed(() => latestOf(tilefinput.value)?.systemData || null);

watch(
    [latestUDL, () => modalUDLIsActive.value],
    () => {
        if (!modalUDLIsActive.value) return;
        const sd = latestUDL.value;
        if (!sd) return;

        // populate fixed payload + base fields once
        if (!udlPayload.System.length) hydrateSA(sd);

        Object.assign(udlTile, {
            noa: sd.noa || '',
            manufacturer: sd.manufacturer || '',
            material: sd.material || '',
            // optional: keep a snapshot array for posting
            arrDesignPressure: udlPayload.Designpressure.slice()
        });
        console.log(udlTile.arrDesignPressure, udlPayload.Designpressure);
        // choose first system if nothing is selected
        if (!currentSysKey.value && udlPayload.System.length) {
            selectedsystemf.value = udlPayload.System[0];
        }
    },
    { immediate: true }
);

// if NOA changes, just clear the selection + local fields and rehydrate
watch(
    () => udlTile.noa,
    (nv, ov) => {
        if (!nv || nv === ov) return;
        selectedsystemf.value = null;
        udlPayload.System = [];
        udlPayload.Designpressure = [];
        udlTile.designpressure = '';
        udlTile.description = '';
        const sd = latestUDL.value;
        if (sd) hydrateSA(sd);
    }
);

// choices for the <Select>
const sysOptions = computed(() => udlPayload.System.map((k) => ({ label: k, value: k })));

// F -> DP map from aligned arrays
const dpBySystem = computed(() => {
    const out = {};
    udlPayload.System.forEach((k, i) => {
        out[k] = udlPayload.Designpressure[i];
    });
    return out; // { E1:-60, E5:-90, ... }
});

// F -> Description map (prefer Description_Fx then fallback)
const descBySystem = computed(() => {
    const out = {};
    for (const k of udlPayload.System) {
        const dk = `Description_${k}`;
        out[k] = udlPayload[dk] ?? udlPayload.Description ?? '';
    }
    return out;
});

const currentSysKey = computed(() => (typeof selectedsystemf.value === 'object' ? selectedsystemf.value?.value : selectedsystemf.value || ''));

const udlPayload = reactive({
    System: [],
    Maps: {}, // { E1:"..", E5:".." }
    Description: '', // generic description // plus Description_E1, Description_E5, ...
    Designpressure: []
});
