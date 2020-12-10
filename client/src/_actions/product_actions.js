import axios from 'axios';
import {
    EDIT_PRODUCT
} from './types';

export function updateProduct(dataToSubmit, _id) {
    const request = axios.post(`/api/product/updateProduct/${_id}`, dataToSubmit)
        .then(response => response.data);
    return {
        type: EDIT_PRODUCT,
        payload: request
    }
}
