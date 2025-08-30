// composables/useTileNoas.js
import { reactive, ref, nextTick } from 'vue';

export function useTileNoas() {
    const mechTilenoa = reactive({});
    const isThiscomplextile = ref(false);
    const isCompTileValid = ref(false);

    function toArray(maybeRefOrArray) {
        return Array.isArray(maybeRefOrArray?.value) ? maybeRefOrArray.value : maybeRefOrArray;
    }

    function replaceReactiveContents(target, source) {
        Object.keys(target).forEach((k) => delete target[k]);
        Object.assign(target, source || {});
    }

    const useNoaTick = async (datamountedMech) => {
        await nextTick();

        const list = toArray(datamountedMech);
        console.log(list);
        const first = list?.[0];
        console.log(first);
        if (!first) return;

        const isMultiple = first?.Table2?.content === 'multiple';

        // flags
        isThiscomplextile.value = !!isMultiple;
        isCompTileValid.value = true;

        // payload
        const base = {
            noa: first.noa,
            manufacturer: first.manufacturer ?? first.applicant ?? '',
            material: first.material ?? ''
        };

        const extra = isMultiple ? { select_tile: first.select_tile ?? '' } : { description: first.description ?? '' };
        console.log(base, extra);
        replaceReactiveContents(mechTilenoa, { ...base, ...extra });

        // Optional:
        // addSystemvalues({ ...mechTilenoa });
        // checkMaterial();
    };

    return {
        mechTilenoa,
        isThiscomplextile,
        isCompTileValid,
        useNoaTick
    };
}
