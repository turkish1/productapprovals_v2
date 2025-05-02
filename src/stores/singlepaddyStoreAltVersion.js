// stores/paddyStore.js
import { defineStore } from 'pinia';

export const usePaddyStore = defineStore('paddyStore', {
    // 1) State
    state: () => ({
        /**
         * Example shape:
         * An array of items, each item has a `singlepaddyData` object
         * (You can adjust the shape to match your real needs)
         */
        inputdata: [
            {
                singlepaddyData: {
                    // applicant: '',
                    // description: '',
                    // material: []
                    // etc...
                    tileDatas: {}
                }
            }
        ]
    }),

    // 2) Getters (optional)
    getters: {
        // Example:
        hasPaddyData: (state) => state.inputdata.length > 0
    },

    // 3) Actions
    actions: {
        /**
         * setSinglePaddyData
         * - Replaces the entire singlepaddyData of the first item in `inputdata`
         * - If you have multiple items, you can pass an index or ID
         */
        setSinglePaddyData(newData) {
            if (this.inputdata.length === 0) {
                // If inputdata array is empty, push a new object
                this.inputdata.push({
                    singlepaddyData: newData
                });
            } else {
                // Otherwise, update the first item’s singlepaddyData
                this.inputdata[0].singlepaddyData = newData;
                console.log(this.inputdata[0].singlepaddyData);
            }
        },

        /**
         * addNewEntry
         * - Pushes a new item with singlepaddyData into the array
         */
        addNewEntry(newData) {
            this.inputdata.push({
                singlepaddyData: newData
            });
        },

        /**
         * clearAllData
         * - Resets the array to empty (or any default shape you want)
         */
        clearAllData() {
            this.inputdata = [];
        },

        /**
         * Example of an async action to fetch data from an API
         * and store it in inputdata.
         */

        async fetchPaddyDataFromAPI(apiUrl) {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Failed to fetch');

                const result = await response.json();
                // Suppose result has shape { applicant, description, material... }
                // You can adapt as needed:
                this.setSinglePaddyData(result);
            } catch (err) {
                console.error('Error fetching paddy data:', err);
            }
        }
    }
});
