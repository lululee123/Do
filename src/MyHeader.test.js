import React from 'react';
import {shallow} from 'enzyme';
import MyHeader from '../components/component/MyHeader';

describe('Button', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<MyHeader />)
            expect(component).toMatchSnapshot()
        });
    });
});