import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

import { useGlobalState } from '@/stores/exposurecStore';

export default function useExposurec() {
    const slope = ref('');
    const slopeNumber = ref();
    const height = ref();
    const results = ref([]);
    const zoneData = ref();
    const loading = ref(false);
    const error = ref(null);
    const type = ref([]);
    const newSlp = ref();
    const newHgt = ref();
    const tables = reactive({
        table1: '',
        table2: '',
        table3: '',
        zn: [],
        zones: {
            lessfifteen: [],
            fifteen: [],
            twenty: [],
            twentyfive: [],
            thirty: [],
            thirtyfive: []
        }
    });

    const heightOptions = {
        fifteen: 15,
        twenty: 20,
        twentyfive: 25,
        thirty: 30,
        thirtyfive: 35,
        forty: 40
    };

    const { addDimzones, addDimslope, addDimheight } = useGlobalState();
    loading.value = true;
    let url = 'https://omdu2tnzbwrm6v4ybp6nfr3gyi0tnoqk.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    let zones = reactive({});
    let tb = reactive({});

    const clampNumber1 = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
    const slopeRange1 = clampNumber1(2, 4.5, 6);
    const clampNumber2 = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
    const slopeRange2 = clampNumber2(4.5, 6, 12);

    function getData(fn1, fn2) {
        slopeNumber.value = fn1;
        height.value = fn2;

        slope.value = Number(slopeNumber.value);
        height.value = Number(height.value);

        if (slope.value >= slopeRange2) {
            // tables.table1 = zoneData.value.slp_two_four;
            // console.log('Six is true');
            passData('table3');
        }
        if (slopeRange1 < slope.value && slope.value < slopeRange2) {
            // console.log('less than Six is true');
            passData('table2');
        }
        if (slope.value < slopeRange1) {
            // console.log('less than 4.5 is true');
            passData('table1');
        }
    }
    const vals = ref([]);
    const maps = ref([]);

    const rawText = ref(''); // v-model will update this
    /* 2️⃣  computed view with NO whitespace */

    function passData(val) {
        type.value = val;
        results.value = execute().then((result) => {
            if (type.value === 'table3') {
                // console.log('table3 executed');

                zoneData.value = result.data.value[0].slp_six_twelve;

                // console.log('table3');
                slopeSelection(slope.value, height.value, zoneData.value);
                addDimslope(slope.value);
                addDimheight(height.value);
            }
            if (type.value === 'table2') {
                // console.log('table2 executed');

                zoneData.value = result.data.value[0].slp_four_six;

                slopeSelection(slope.value, height.value, zoneData.value);
                addDimslope(slope.value);
                addDimheight(height.value);
            }
            if (type.value === 'table1') {
                zoneData.value = result.data.value[0].slp_two_four;

                slopeSelection(slope.value, height.value, zoneData.value);
                addDimslope(slope.value);
                addDimheight(height.value);
            }
        });
        return results.value;
    }
    function slopeSelection(slp, hgt, zn) {
        newSlp.value = slp;
        newHgt.value = hgt;
        zones = zn;

        // if (slope.value < slopeRange1) {
        processData(zones);
        // }
    }

    // I need to work on the less than greater than conditions
    function processData(z) {
        const z1 = z;

        const fifteen = Number(heightOptions.fifteen);
        const twenty = Number(heightOptions.twenty);
        const twentyfive = Number(heightOptions.twentyfive);
        const thirty = Number(heightOptions.thirty);
        const thirtyfive = Number(heightOptions.thirtyfive);
        const forty = Number(heightOptions.forty);
        if (newHgt.value < fifteen) {
            zones = z1.lessfifteen[0];

            // console.log('if 15 statement was executed');
            // lessthanfifteen(zones);
            Object.entries(zones).map((obj) => {
                // console.log('Object statement was executed');

                const key = obj[0];
                const val = obj[1];

                tables.zones.lessfifteen.push(val);
            });
            tb = tables.zones.lessfifteen;

            addDimzones(tb);
        } else if (newHgt.value >= fifteen && newHgt.value < twenty) {
            // fifteen <= newHgt.value ||
            zones = z1.fifteen[0];
            // console.log('if statement for 15 to 20 was executed');
            // fifteenormore(zones);
            Object.entries(zones).map((obj) => {
                // console.log('Object statement was executed');
                const key = obj[0];
                const val = obj[1];

                tables.zones.fifteen.push(val);
            });
            tb = tables.zones.fifteen;

            addDimzones(tb);
        } else if (newHgt.value < twentyfive && newHgt.value >= twenty) {
            // || newHgt.value < twentyfive

            zones = z1.twenty[0];
            // console.log('if 22 statement was executed');
            Object.entries(zones).map((obj) => {
                const key = obj[0];
                const val = obj[1];

                tables.zones.twenty.push(val);
            });
            tb = tables.zones.twenty;

            addDimzones(tb);
        } else if (newHgt.value < thirty && newHgt.value >= twentyfive) {
            zones = z1.twentyfive[0];
            // console.log('if 25 statement was executed');
            Object.entries(zones).map((obj) => {
                // console.log('Object statement was executed');
                const key = obj[0];
                const val = obj[1];

                tables.zones.twentyfive.push(val);
            });
            tb = tables.zones.twentyfive;

            addDimzones(tb);
        } else if (newHgt.value < thirtyfive && newHgt.value >= thirty) {
            zones = z1.thirty[0];
            // console.log('if statement 32 was executed');
            Object.entries(zones).map((obj) => {
                // console.log('Object statement was executed');
                const key = obj[0];
                const val = obj[1];

                tables.zones.thirty.push(val);
            });
            tb = tables.zones.thirty;
            // console.log(tb);
            addDimzones(tb);
        } else if (newHgt.value < forty && newHgt.value >= thirtyfive) {
            zones = z1.thirtyfive[0];

            Object.entries(zones).map((obj) => {
                // console.log('Object statement was executed');
                const key = obj[0];
                const val = obj[1];

                tables.zones.thirtyfive.push(val);
            });
            tb = tables.zones.thirtyfive;

            addDimzones(tb);
        }
    }
    loading.value = false;
    // slopeSelection_fourtosix, slopeSelection_sixtotwelve,
    return { type, error, newSlp, tb, processData, newHgt, slopeSelection, loading, zoneData, slope, tables, results, getData };
}
