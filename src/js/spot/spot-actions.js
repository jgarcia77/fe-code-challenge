import axios from 'axios';

export const SPOT_UPDATE_SELECTED = 'SPOT_UPDATE_SELECTED';
export const SPOT_PURCHASE = 'SPOT_PURCHASE';

export const updateSelected = spot => {
    return {
        type: SPOT_UPDATE_SELECTED,
        payload: spot
    };
};

export const updateCheckout = data => {
    return {
        type: SPOT_PURCHASE,
        payload: data
    };
};

export const submitPurchase = (data) => {
    return async function(dispatch) {
        try {
            const response = await axios.post('/reservations', data);
            dispatch(updateCheckout({success: true, email: response.data.email}));
        } catch (error) {
            dispatch(updateCheckout({success: false}));
        }
    }
}
