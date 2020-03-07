import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateSelected, updateCheckout} from '../spot/spot-actions';
import SpotList from './spot-list/SpotList';

const Search = ({
    selectedSpot,
    spots,
    setSpot,
    updateCheckout
}) => {
    return (
        <div className="Search">
            <SpotList
                spots={spots}
                selectedSpot={selectedSpot}
                setSpot={setSpot}
                updateCheckout={updateCheckout}
            />
            <div id="modal-root" className="Search-content" />
        </div>
    );
};

Search.propTypes = {
    selectedSpot: PropTypes.object,
    spots: PropTypes.arrayOf(PropTypes.object).isRequired,
    setSpot: PropTypes.func.isRequired,
    updateCheckout: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot
        }
    } = state;

    return {
        selectedSpot
    };
};

const mapDispatchToProps = {
    updateCheckout,
    setSpot: updateSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
