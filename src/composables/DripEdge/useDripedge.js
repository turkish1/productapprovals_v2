import usedripAxios from '@/composables/use-dripAxios';
import { ref } from 'vue';

// const selectDripEdge = ref('');
// const selectDripEdgeSize = ref('');

// const { type, holdSize, hold } = usedripAxios();

export default function useDripEdge() {
    const selectDripEdge = ref('');
    const selectDripEdgeSize = ref('');

    const { type, holdSize, hold } = usedripAxios();

    return { selectDripEdge, selectDripEdgeSize, holdSize, hold, type };
}
