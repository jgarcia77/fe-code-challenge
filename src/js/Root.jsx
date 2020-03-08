import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import axios from 'axios';
import {buildStore, getHistory} from './store/store';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'

const reduxStore = buildStore();

export default class Root extends Component {
    state = {
        isLoading: true,
        spots: []
    };

    componentDidMount() {
        this._loadSpots();
    }

    async _loadSpots() {
        try {
            const {
                data
            } = await axios.get('/spots');

            this.setState({
                isLoading: false,
                spots: data
            });
        } catch (error) {
            console.log('Error loading spot data: ', error); // eslint-disable-line no-console
        }
    }

    render() {
        const {
            isLoading,
            spots
        } = this.state;

        if (isLoading) {
            return (
                <div className="Root-loader">
                    Loading...
                </div>
            );
        }

        return (
            <div className="Root">
                <Provider store={reduxStore.storeInstance}>
                    <PersistGate loading={null} persistor={reduxStore.persistorInstance}>
                        <ConnectedRouter history={getHistory()}>
                            <App spots={spots} />
                        </ConnectedRouter>
                    </PersistGate>
                </Provider>
            </div>
        );
    }
}
