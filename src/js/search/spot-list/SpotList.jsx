import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import TextButton from '../../common/TextButton';
import SpotItem from '../../spot/SpotItem';
import SpotDetails from '../../spot/SpotDetails';
import Modal from '../../common/Modal';

export default class SpotList extends PureComponent {
    static propTypes = {
        selectedSpot: PropTypes.object,
        spots: PropTypes.arrayOf(PropTypes.object).isRequired,
        setSpot: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            modalOpen: false
        }
    }

    componentDidMount() {
        if (this.props.selectedSpot) {
            this._onDetailsClick(this.props.selectedSpot);
        }
    }

    _onDetailsClick = spot => {
        this.props.setSpot(spot);
        this.setState({modalOpen: true});
    }

    _onModalDetailsClose = () => {
        this.setState({modalOpen: false});

        setTimeout(() => {
            this.props.setSpot(null);
        }, 400);
    }

    render() {
        const {
            selectedSpot,
            spots
        } = this.props;

        const {
            modalOpen
        } = this.state;

        return (
            <div className="SpotList">
                <div className="SpotList-feature">
                    <div className="SpotList-breadcrumbs">
                        <TextButton>Chicago</TextButton> &gt; Millennium Park
                    </div>
                    <h1>Millennium Park</h1>
                    <p>{spots.length} Spots Available</p>
                </div>
                <div className="SpotList-spots">
                    {spots.map(spot => {
                        return (
                            <SpotItem
                                key={spot.id}
                                data={spot}
                                isSelected={selectedSpot && selectedSpot.id === spot.id}
                                onDetailsClick={this._onDetailsClick}
                            />
                        );
                    })}
                </div>
                <Modal
                    isOpen={modalOpen}
                    onClose={this._onModalDetailsClose}>
                    <SpotDetails spot={selectedSpot ? selectedSpot : {}} /> 
                </Modal>
            </div>
        );
    }
}
