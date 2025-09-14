//Drip Edge in composable
import { usedripMStore } from '@/stores/dripEdgeMechTileStore';

export function checkRoof(roofType, typeValue, types) {
    for (let i = 0; i < roofType.length; i++) {
        if (roofType[i].item === 'Mechanical Fastened Tile') {
            console.log(roofType[i].item);
            types.value = typeValue;
            return true;
        }
    }
    mtile();
    return false;
}

export function getDripSize(selectDripEdge, holdSize, typeSizes, dripStagedata, checkRoof, roofType, typeValue, types) {
    const { DRIP_EDGE_MATERIALS } = require('@/constants/dripEdgeConstants');
    if (selectDripEdge) {
        if (selectDripEdge === DRIP_EDGE_MATERIALS.GALVANIZED_STEEL) {
            typeSizes.value = holdSize.size1;
            checkRoof(roofType, typeValue, types);
        } else if (selectDripEdge === DRIP_EDGE_MATERIALS.STAINLESS_STEEL) {
            typeSizes.value = holdSize.size2;
            checkRoof(roofType, typeValue, types);
        } else if (selectDripEdge === DRIP_EDGE_MATERIALS.ALUMINUM) {
            typeSizes.value = holdSize.size3;
            checkRoof(roofType, typeValue, types);
        } else if (selectDripEdge === DRIP_EDGE_MATERIALS.COPPER) {
            typeSizes.value = holdSize.size4;
            checkRoof(roofType, typeValue, types);
        }
    } else {
        console.log('The element not mounted yet');
    }
    dripStagedata.DripEdgeMaterial = selectDripEdge;
    dripStagedata.DripEdgeSize = selectDripEdge ? selectDripEdge.size : '';
    checkRoof(roofType, typeValue, types);
}

export function mtile(selectDripEdge, dripMTileData, storeDripEdgeSize) {
    console.log(selectDripEdge);
    dripMTileData.DripEdgeMaterial = selectDripEdge;
    storeDripEdgeSize();
}

export function storeDripEdgeSize(dripStagedata, isRoofTileMechanicalValid) {
    const mechtileStore = usedripMStore();
    console.log(dripStagedata.DripEdgeMaterial, dripStagedata.DripEdgeSize);
    if (isRoofTileMechanicalValid) {
        mechtileStore.$reset();
        mechtileStore.insertDripAtIndex(2, dripStagedata.DripEdgeMaterial);
        mechtileStore.insertDripAtIndex(3, dripStagedata.DripEdgeSize);
    }
    console.log(mechtileStore);
}
