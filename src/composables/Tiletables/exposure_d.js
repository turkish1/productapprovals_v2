import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

import { useExposureD } from '@/stores/exposuredStore';

export default function useExposured() {
    const slope = ref('');
    const slopeNumber = ref();
    const height = ref();
    const results = ref([]);
    const zoneDatas = ref();
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
        zoned: {
            lessfifteen: [],
            fifteen: [],
            twenty: [],
            twentyfive: [],
            thirty: [],
            thirtyfive: []
        }
    });
    const { addDimzoned, addDimsloped, addDimheightd } = useExposureD();
    loading.value = true;
    let url = 'https://56loihllfj5w27ywslgbxlhp3a0uppfh.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    let zoned = reactive({});
    let tbd = reactive({});
    const heightOptions = {
        fifteen: 15,
        twenty: 20,
        twentyfive: 25,
        thirty: 30,
        thirtyfive: 35,
        forty: 40
    };

    const clampNumber1 = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
    const slopeRange1 = clampNumber1(2, 4.5, 6);
    const clampNumber2 = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
    const slopeRange2 = clampNumber2(4.5, 6, 12);

    function getDatas(fn1, fn2) {
        slopeNumber.value = fn1;
        height.value = fn2;

        slope.value = Number(slopeNumber.value);
        height.value = Number(height.value);

        if (slope.value >= slopeRange2) {
            // tables.table1 = zoneDatas.value.slp_two_four;
            console.log('Six is true');
            passData('table3');
        }
        if (slopeRange1 < slope.value && slope.value < slopeRange2) {
            console.log('less than Six is true');
            passData('table2');
        }
        if (slope.value < slopeRange1) {
            console.log('less than 4.5 is true');
            passData('table1');
        }
    }

    function passData(val) {
        type.value = val;
        results.value = execute().then((result) => {
            if (type.value === 'table3') {
                console.log('table3 executed');
                console.log(result);

                zoneDatas.value = result.data.value[0].slp_six_twelve;

                slopeSelection(slope.value, height.value, zoneDatas.value);
                addDimsloped(slope.value);
                addDimheightd(height.value);
            }
            if (type.value === 'table2') {
                console.log('table2 executed');

                zoneDatas.value = result.data.value[0].slp_four_six;

                slopeSelection(slope.value, height.value, zoneDatas.value);
                addDimsloped(slope.value);
                addDimheightd(height.value);
            }
            if (type.value === 'table1') {
                console.log('table1 executed');

                zoneDatas.value = result.data.value[0].slp_two_four;

                slopeSelection(slope.value, height.value, zoneDatas.value);
                addDimsloped(slope.value);
                addDimheightd(height.value);
            }
        });
        return results.value;
    }
    function slopeSelection(slp, hgt, zn) {
        newSlp.value = slp;
        newHgt.value = hgt;
        zoned = zn;
        console.log(zoned);

        // if (slope.value < slopeRange1) {
        processData(zoned);
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
            zoned = z1.lessfifteen[0];

            // lessthanfifteen(zoned);
            Object.entries(zoned).map((obj) => {
                console.log('Object statement was executed');
                const key = obj[0];
                const val = obj[1];

                tables.zoned.lessfifteen.push(val);
            });
            tbd = tables.zoned.lessfifteen;
            addDimzoned(tbd);
        } else if (newHgt.value >= fifteen && newHgt.value < twenty) {
            // fifteen <= newHgt.value ||
            zoned = z1.fifteen[0];

            // fifteenormore(zoned);
            Object.entries(zoned).map((obj) => {
                const key = obj[0];
                const val = obj[1];

                tables.zoned.fifteen.push(val);
            });
            tbd = tables.zoned.fifteen;

            addDimzoned(tbd);
        } else if (newHgt.value < twentyfive && newHgt.value >= twenty) {
            // || newHgt.value < twentyfive

            zoned = z1.twenty[0];
            console.log('if 22 statement was executed');
            Object.entries(zoned).map((obj) => {
                const key = obj[0];
                const val = obj[1];

                tables.zoned.twenty.push(val);
            });
            tbd = tables.zoned.twenty;

            addDimzoned(tbd);
        } else if (newHgt.value < thirty && newHgt.value >= twentyfive) {
            zoned = z1.twentyfive[0];

            Object.entries(zoned).map((obj) => {
                const key = obj[0];
                const val = obj[1];

                tables.zoned.twentyfive.push(val);
            });
            tbd = tables.zoned.twentyfive;

            addDimzoned(tbd);
        } else if (newHgt.value < thirtyfive && newHgt.value >= thirty) {
            zoned = z1.thirty[0];

            Object.entries(zoned).map((obj) => {
                console.log('Object statement was executed');
                const key = obj[0];
                const val = obj[1];

                tables.zoned.thirty.push(val);
            });
            tbd = tables.zoned.thirty;
            addDimzoned(tbd);
        } else if (newHgt.value < forty && newHgt.value >= thirtyfive) {
            zoned = z1.thirtyfive[0];

            Object.entries(zoned).map((obj) => {
                const key = obj[0];
                const val = obj[1];

                tables.zoned.thirtyfive.push(val);
            });
            tbd = tables.zoned.thirtyfive;

            addDimzoned(tbd);
        }
    }
    loading.value = false;
    // slopeSelection_fourtosix, slopeSelection_sixtotwelve,
    return { type, error, newSlp, tbd, processData, newHgt, slopeSelection, loading, zoneDatas, slope, tables, results, getDatas };
}
