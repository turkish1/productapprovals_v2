import useInputpoly from '@/composables/use-Inputpoly';
import useInputs from '@/composables/use-Inputs';
import { ref } from 'vue';

export default function useInputnoa() {
    const { input, takeValue } = useInputs();

    const { inputsystem, takef } = useSystemf();
    const { inp, takp } = useInputpoly();

    let datasystemf = ref();
    let datasbs = ref();
    let datapoly = ref();
    let udlInput = ref(null);
    let saInput = ref(null);
    let noaInput = ref(null);

    return { datasystemf, datasbs, datapoly, udlInput, saInput, noaInput };
}
