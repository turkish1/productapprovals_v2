import { defineStore } from 'pinia';

export const useRoofListStore = defineStore('roofList', {
    state: () => ({
        roofList: [],
        id: 0
    }),
    actions: {
        addSystem(item, dim) {
            this.roofList.push({ item, dim, id: this.id++, completed: false });
        },
        deleteSystem(itemId) {
            this.roofList = this.roofList.filter((object) => {
                return object.id !== itemId;
            });
        },
        toggleCompleted(idToFind) {
            const list = this.roofList.find((obj) => obj.id === idToFind);
            if (list) {
                list.completed = !list.completed;
            }
        }
    }
});
