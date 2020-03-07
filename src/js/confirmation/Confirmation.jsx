import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Button from '../common/Button';
import Image from '../common/Image';

class Confirmation extends PureComponent {
    static propTypes = {
        checkout: PropTypes.object,
        selectedSpot: PropTypes.object,
        pushTo: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {
            pushTo,
            selectedSpot
        } = this.props;

        if (!selectedSpot) {
            pushTo('/');
        }
    }

    _onPurchaseAnotherClick = evt => {
        const {
            pushTo,
        } = this.props;

        pushTo('/');
    }

    render() {
        const {
            checkout,
            selectedSpot
        } = this.props;

        if (!selectedSpot) {
            return null;
        }

        return (
            <div className="Confirmation">
                <h1>Park it like its hot!</h1>
                <p>You successfully purchased parking at <strong>{selectedSpot.title}</strong> for <strong>${(selectedSpot.price / 100).toFixed(2)}</strong>.</p>
                <Image src={selectedSpot.image} />
                <p>We emailed a receipt to <a href={`mailto:${checkout.email}`}>{checkout.email}</a>.</p>
                <Button
                    color="primary"
                    onClick={this._onPurchaseAnotherClick}
                >
                    Purchase Another Spot!
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot,
            checkout
        }
    } = state;

    return {
        checkout,
        selectedSpot
    };
};

const mapDispatchToProps = {
    pushTo: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
