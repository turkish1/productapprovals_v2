// import DataService from '@/services/DataService';
import { usesystemfStore } from '@/stores/systemfStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useSystemf() {
    const inputsystem = ref();
    const effort = ref([]);
    const noaNum = ref([]);
    let results = ref([]);
    const store = usesystemfStore();

    const error = ref('');

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/systemtypef';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const systemData = reactive({
        noa: '',
        manufacturer: '',
        material: '',
        description: '',
        design_pressure: '',
        expiration_date: ''
    });
    function takef(saNoa) {
        inputsystem.value = saNoa;
        console.log(inputsystem.value);
        const result = execute().then((result) => {
            noaNum.value = data.value;

            results.value = noaNum.value.forEach((item, index) => {
                console.log(item.Expiration_Date, item.Manufacturer.Name);
                let num = Number(inputsystem.value);
                console.log(item.NOA_No, num);
                if (item.NOA_No === num) {
                    systemData.manufacturer = item.Manufacturer.Name;
                    systemData.material = item.materials;
                    systemData.description = item.Description;
                    systemData.expiration_date = item.Expiration_Date;
                    systemData.design_pressure = item.Approved_Assemblies[0].System_F1.Underlayment_Uplift_Design_Pressure;
                    // System_F1.Underlayment_Uplift_Design_Pressure;

                    store.addData(systemData);
                    // area.value = '';
                    // type.value = '';
                    console.log(systemData, 'System added');
                }
            });
            return results;
        });
    }

    // 18061905

    return { inputsystem, takef, noaNum, error, results, ...toRefs(systemData), store };
}
