import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {User} from './models/user';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
const mockUsers: User[] = [
    {
        user_id: 1,
        display_name: "John Doe",
        reputation: 100,
        profile_image: 'nothing',
        followed: false,
        blocked: false
    },
    {
        user_id: 1,
        display_name: "John Doe1",
        reputation: 101,
        profile_image: 'nothing',
        followed: false,
        blocked: false
    },
    {
        user_id: 1,
        display_name: "John Doe2",
        reputation: 101,
        profile_image: 'nothing',
        followed: false,
        blocked: false
    },
    {
        user_id: 2,
        display_name: "Jane Smith",
        reputation: 101,
        profile_image: 'nothing',
        followed: false,
        blocked: false
    },
];

function wait(milliseconds: number | undefined){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

const url = 'http://api.stackexchange.com/2.2/users?order=desc&sort=reputation&site=stackoverflow&page=1&pagesize=20';

describe("App", () => {
    beforeAll(() => {
        global.matchMedia = global.matchMedia || function () {
            return {
                addListener: jest.fn(),
                removeListener: jest.fn(),
            };
        };
    });
    beforeEach(() => {
        mock.onGet(url).reply(200, {
            mockUsers,
        });
    })

    it('fetches users', async () => {
        axios.get(url).then((response) => {
            console.log(response.data); // Mocked response data
        });
        expect(mock.history.get.length).toBe(1); // times called
        // expect(mock.history.get.data).toBe(JSON.stringify({ foo: "bar" })); // get object
    });

    test('renders the landing page', () => {
        render(<App/>);
    });

    it("fetches and displays users", async () => {
        // const renderComponent = async () => await render(<App/>);
        render(<App/>);
        await wait(1000);

        // expect(mock.history.get).toBe(JSON.stringify({ foo: "bar" })); // get object

        // Check if the user list is rendered with the correct data
        const name = await screen.getByText('John Doe');
        expect(name).toBeInTheDocument();
    });
});
