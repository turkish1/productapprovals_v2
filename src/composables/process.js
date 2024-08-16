import useLast from '@/composables/lastNumber.js';
import { ref } from 'vue';

export default function useProcess() {
    const { resNum, lastNum } = useLast();
    console.log(resNum.value);
    const pNum = ref('');
    const currentYear = ref(new Date().getFullYear());
    const sequenceLength = ref(6);
    const startingLetter = ref('me');
    // Generate the sequence
    const sequence = Array.from({ length: 10 ** sequenceLength.value }, (_, i) => `${startingLetter.value}${currentYear.value}${String(i).padStart(sequenceLength.value, '0')}`);

    pNum.value = sequence[0] + 1;
    console.log(pNum.value, resNum.value);
    // this.$refs.processNumber.value =   pNum.value;
    // this.$store.state.holdNumber = pNum.value;
    return { pNum, lastNum, resNum };
}
