import React from 'react';
import { useForm } from 'react-hook-form';
import TextBox from '../common/TextBox';
import Button from '../common/Button';
import Image from '../common/Image';
import {connect} from 'react-redux';
import {submitPurchase} from '../spot/spot-actions';
import {push} from 'connected-react-router';
import { Link } from "react-router-dom";
import {formatPrice} from "../utils/number-formatting";
import regExPatterns from "../utils/regex-patterns";

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
            <div className="nav">
                <Link to="/">&#60; Back to Search</Link>
            </div>
            <div className="header">
                <div className="spot-image">
                    <Image src={selectedSpot.image} />
                </div>
                <div className="spot-info">
                    <h1  className="heading-sm">{selectedSpot.title}</h1>
                    <p>{selectedSpot.distance}</p>
                </div>
            </div>
            <hr />
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
                        pattern: regExPatterns.email
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
                        pattern: regExPatterns.phone
                    })} 
                    error={errors.phone} 
                    messages={{
                        required: "Please enter a valid phone number",
                        pattern: "Please enter a valid phone number"
                        }} />

                <div className="action-buttons">
                    <Button type="submit" color="submit">Purchase for {formatPrice(selectedSpot.price)}</Button>
                </div>
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