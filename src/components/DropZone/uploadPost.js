import axios from 'axios';
import { useAxios } from '@vueuse/integrations/useAxios';

const instance = axios.create({
    baseURL: '/api'
});

const { data, isFinished } = useAxios('/upload', { method: 'POST' }, instance);
