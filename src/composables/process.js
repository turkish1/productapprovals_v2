import useLast from '@/composables/lastNumber';
import { ref } from 'vue';

// The useLast function does return the value but is not accessable here 8/16/2024
export default function useProcess() {
    const { resNum, lastNum } = useLast();

    const pNum = ref('');
    const currentYear = ref(new Date().getFullYear());
    const sequenceLength = ref(6);
    const startingLetter = ref('me');
    // Generate the sequence
    const sequence = Array.from({ length: 10 ** sequenceLength.value }, (_, i) => `${startingLetter.value}${currentYear.value}${String(i).padStart(sequenceLength.value, '0')}`);
    const test = useLast((item) => {
        console.log(item);
    });

    console.log(test);
    pNum.value = sequence[0] + 1;
    if (lastNum.value !== 0) {
    } else {
        pNum.value = lastNum.value + 1;
    }

    return { pNum, lastNum, resNum, test };
}
