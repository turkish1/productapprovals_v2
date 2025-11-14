import usedripAxios from '@/composables/use-dripAxios';
import { ref } from 'vue';

export default function useDripEdge() {
    const selectDripEdge = ref('');
    const selectDripEdgeSize = ref('');

    const { type, hold, sizeTypeMetal } = usedripAxios();

    return { selectDripEdge, selectDripEdgeSize, sizeTypeMetal, hold, type };
}
