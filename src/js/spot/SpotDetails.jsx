import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import {formatPrice} from "../utils/number-formatting";
import {withRouter} from 'react-router-dom';

const SpotDetails = ({spot, history}) => {
    const _onBookItClick = () => {
        history.push('/checkout');
    }

    return (
        <div className="spot-details">
            <h1 className="heading-sm title">Spot Details</h1>
            <h2 className="heading-sm sub-title">{spot.title}</h2>
            <p>{spot.description}</p>
            <div className="book-it">
                <Button data-testid="test-book-it" color="primary" onClick={_onBookItClick}>
                    {formatPrice(spot.price)} &#124; Book It!
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

export default withRouter(SpotDetails);