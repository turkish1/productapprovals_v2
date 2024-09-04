import { defineStore } from 'pinia';

export const useRoofListStore = defineStore('roofList', {
    state: () => ({
        roofList: [],
        id: 0
    }),
    actions: {
        addSystemShingle(item, dim1) {
            this.roofList.push({ item, dim1, id: this.id++, completed: false });
        },
        addSystemBur(item, dim2) {
            this.roofList.push({ item, dim2, id: this.id++, completed: false });
        },
        addSystemMTile(item, dim3) {
            this.roofList.push({ item, dim3, id: this.id++, completed: false });
        },
        addSystemATile(item, dim4) {
            this.roofList.push({ item, dim4, id: this.id++, completed: false });
        },
        addSystemMetal(item, dim4) {
            this.roofList.push({ item, dim5, id: this.id++, completed: false });
        },
        deleteSystem(itemId) {
            this.roofList = this.roofList.filter((object) => {
                return object.id !== itemId;
            });
        },
        reset() {
            this.roofList = [];
        },
        toggleCompleted(idToFind) {
            const list = this.roofList.find((obj) => obj.id === idToFind);
            if (list) {
                list.completed = !list.completed;
            }
        },

        getters: {
            roofData: (state) => state.item
        }
    }
    // persist: true
});
