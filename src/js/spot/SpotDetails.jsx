import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import { Link } from "react-router-dom";
import {formatPrice} from "../utils/number-formatting";

const SpotDetails = ({spot}) => {
    return (
        <div className="spot-details">
            <h1 className="heading-sm title">Spot Details</h1>
            <h2 className="heading-sm sub-title">{spot.title}</h2>
            <p>{spot.description}</p>
            <div className="book-it">
                <Button color="primary">
                    <Link to="/checkout">{formatPrice(spot.price)} &#124; Book It!</Link>
                </Button>
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