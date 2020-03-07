import React from 'react';
import { useForm } from 'react-hook-form';
import TextBox from '../common/TextBox';
import Button from '../common/Button';
import {connect} from 'react-redux';
import {submitPurchase} from '../spot/spot-actions';
import {push} from 'connected-react-router';

const Checkout = ({selectedSpot, purchaseSpot, checkoutStatus, pushTo}) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => { 
        const postData = {
            spotId: selectedSpot.id,
            ...data
        };

        purchaseSpot(postData);
    }

    React.useEffect(() => {
        if (!selectedSpot) {
            pushTo("/");
        }
    }, [selectedSpot, pushTo]);

    React.useEffect(() => {
        if (checkoutStatus && checkoutStatus.success) {
            pushTo("/confirmation");
        }
    }, [checkoutStatus, pushTo]);

    return (
        <div className="Checkout">
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextBox 
                    name="firstName" 
                    label="First Name" 
                    register={register} />

                <TextBox 
                    name="lastName" 
                    label="Last Name" 
                    register={register} />

                <TextBox 
                    name="email" 
                    label="Email" 
                    register={register({
                        required: true,
                        // eslint-disable-next-line
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })} 
                    error={errors.email} 
                    messages={{
                        required: "Please enter a valid email",
                        pattern: "Please enter a valid email"
                        }} />

                <TextBox 
                    name="phone" 
                    label="Phone Number" 
                    register={register({
                        required: true,
                        // eslint-disable-next-line
                        pattern: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
                    })} 
                    error={errors.phone} 
                    messages={{
                        required: "Please enter a valid phone number",
                        pattern: "Please enter a valid phone number"
                        }} />

                <Button type="submit" color="submit">Purchase for </Button>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot,
            checkout: checkoutStatus
        }
    } = state;

    return {
        selectedSpot,
        checkoutStatus
    };
};

const mapDispatchToProps = {
    purchaseSpot: submitPurchase,
    pushTo: push
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);