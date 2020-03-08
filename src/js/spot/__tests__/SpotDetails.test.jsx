import '@testing-library/jest-dom'
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import SpotDetails from '../SpotDetails';
import renderer from 'react-test-renderer';

const props = {
    id: 1,
    title: "Seven Lions - Valet",
    price: 1400,
    description: "Arrive at this location at 97 E Adams St. This is the Seven Lions valet stand operated by VPA. It is located in front of Starbucks on the south side of E Adams St. between S Michigan Ave. and S Wabash Ave. If you are using the SpotHero Mobile App, please refer to the 2nd picture for an annotated map.",
    distance: "0.1 mi",
    image: "https://res.cloudinary.com/spothero/image/upload/v1579704583/front-end/code-challenge/wkabs86wl5zwqaksb6fr.jpg",
    history: {
        push: jest.fn()
    }
}

const component = <SpotDetails.WrappedComponent {...props} />;

describe("Feature: SpotDetails Component", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("Scenario: Test Markup", () => {
        describe("When the component is rendered", () => {
            it("Then it should match the snapshot", () => {
                const json = renderer.create(component);

                expect(json).toMatchSnapshot();
            });
        });
    });

    describe("Scenario: Test Events", () => {
        describe("When the book it button is clicked", () => {
            it("Then it should navigate to the checkout page", () => {
                render(component);

                const btnBookIt = screen.getByTestId("test-book-it");
            
                fireEvent.click(btnBookIt);
            
                expect(props.history.push).toHaveBeenCalledWith("/checkout");
            });
        });
    });
});