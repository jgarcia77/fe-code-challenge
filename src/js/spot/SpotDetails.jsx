import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const SpotDetails = ({spot}) => {
    const formatPrice = value => {
        if (typeof value !== "number") {
            return '';
        }

        const regex = /\b(\d+)(\d{2})\b/;
        const subst = '$1.$2';
        return value.toString().replace(regex, subst);
    }

    return (
        <div className="spot-details">
            <h1 className="heading-sm title">Spot Details</h1>
            <h2 className="heading-sm">{spot.title}</h2>
            <p>{spot.description}</p>
            <div className="book-it">
                <div className="Button Button-primary">
                    <Link to="/checkout">${formatPrice(spot.price)} Book It!</Link>
                </div>
            </div>
        </div>
    );
}

SpotDetails.propTypes = {
    spot: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number
    })
};

SpotDetails.defaultProps = {
    spot: {}
};

export default SpotDetails;