import { useStore } from 'pinia';

function resetAllStores() {
    const stores = useStore();
    Object.values(stores).forEach((store) => {
        store.$reset();
    });
}
