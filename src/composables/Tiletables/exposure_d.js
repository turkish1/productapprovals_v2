import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function useExposurec(fn1, fn2) {
    const slope = ref(fn1);
    const slopeNumber = ref(fn1);
    const height = ref(fn2);
    const results = ref([]);

    const loading = ref(false);
    const error = ref(null);
    const type = ref([]);
    const tables = reactive({
        table1: '',
        table2: '',
        table3: ''
    });
    const zoneData = ref();

    loading.value = true;
    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/zonec2023';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    results.value = execute().then((result) => {
        zoneData.value = data.value.result;
        console.log(zoneData.value);

        // holdSize.value = data.value.result;
        // hold.value = data.value.result.Drip_Edge_Material_Type;
        // for (let i = 0; i < hold.value.length; i++) {
        //     type.value.push(hold.value[i]);
        // }
        // typeSize.value.push(holdSize.value.size1, holdSize.value.size2, holdSize.value.size3, holdSize.value.size4);

        // return hold.value;
    });
    function getData() {
        slope.value = Number(slopeNumber.value);
        height.value = Number(height.value);
        if (slope.value < 4.5) {
            console.log('I am in ', slope.value, height.value);

            //   if (slopeNumber.value > 4 && slopeNumber.value <= 12) {
            //       isSlopeValid.value = true;

            //   }
            //   if (slopeNumber.value >= 2 && slopeNumber.value <= 4) {
            //       console.log('Entered on 3: ', slopeNumber.value, isSelectVisible1.value);

            //   }
            //   if (slopeNumber.value < 2) {
            //       isSlopeValid.value = false;
            //   }
            //   } else {
            //       console.log('Not Mounted');
            //   }
        }
    }

    loading.value = false;

    return { type, error, loading, zoneData, slopes, tables, results, getData };
}
