// import apiClient from '../../http-axios';

import axios from 'axios';
const apiClient = axios.create({
    baseURL: `https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint`,
    // withCredentials: false,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        apiKey: 'LduI7j9z7Iwppo1AbxE9TBz2z2lJFZZFF3MU5ZFCbfxHU8wMlyCjvz0pWMByVH5n',
        // 'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
});

// const { data, isFinished } = useAxios('/noa', { method: 'GET' }, apiClient);
export default {
    getAddr() {
        return apiClient.get('/folio');
    },
    postProcessnumber(data) {
        return apiClient.post('/process', data);
    },
    getLastProcess() {
        return apiClient.get('/lastnumber');
    },
    getSlopeless() {
        return apiClient.get('/slopeless');
    },

    getSlopemore() {
        return apiClient.get('/slopemore');
    },
    getdeOne() {
        return apiClient.get('/desupone');
    },
    getdeTwo() {
        return apiClient.get('/desuptwo');
    },
    getdeThree() {
        return apiClient.get('/desupthree');
    },
    getdeFour() {
        return apiClient.get('/desupfour');
    },

    getZones23() {
        return apiClient.get('/gableroofs23');
    },

    getNoa() {
        return apiClient.get('/noa');
    },

    getSBS() {
        return apiClient.get('/shinglesbs');
    },

    getSystemE() {
        return apiClient.get('/systemtype');
    },

    getburMaterial() {
        return apiClient.get('/burmaterial');
    },

    getnewburMaterial() {
        return apiClient.get('/burmaterials');
    },

    getburSystem() {
        return apiClient.get('/bursystem');
    },
    getPoly() {
        return apiClient.get('/shinglepoly');
    },
    getSystemF() {
        return apiClient.get('/systemtypef');
    },

    getdeGauge() {
        return apiClient.get('/degauge');
    },
    getdeMaterial() {
        return apiClient.get('/dematerial');
    },
    getdeMatMore() {
        return apiClient.get('/dematerials');
    },
    getdeSize() {
        return apiClient.get('/desize');
    },

    getdeFastener() {
        return apiClient.get('/defastener');
    },

    getprimeBase() {
        return apiClient.get('/primebase');
    },
    getPerimeter() {
        return apiClient.get('/perimeter');
    },

    getNoaTiles(noa) {
        return http.get(`/tiles/${noa}`);
    },

    getTile() {
        return http.get('/tileroof');
    },

    getTiles() {
        return apiClient.get('/tilenoa');
    },
    getZones() {
        return apiClient.get('/gablezones');
    },
    getLay() {
        return apiClient.get('/underlaymentshingle');
    },
    getContractors() {
        return apiClient.get('/contractors');
    },

    postAccount(input) {
        return apiClient.post('/accounts', input);
    },
    getDripMaterials() {
        return apiClient.get('/dripmaterials');
    }
};
