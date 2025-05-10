import axios from 'axios';

export const createPaymentIntent = async (amount) => {
    const response = await axios.post('/api/create-payment-intent', {
        amount: amount
    });
    return response.data.clientSecret;
};
