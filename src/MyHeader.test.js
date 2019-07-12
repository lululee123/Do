import React from 'react';
import { shallow, configure } from 'enzyme';
import MyHeader from '../components/component/MyHeader';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() })

describe('Rendering', () => {
    it('render without any props', () => {
        const component = shallow(<MyHeader />);
        expect(component).toMatchSnapshot();
    });

    it('title display correct', () => {
        const titleArray = ['', '123', 'abc'];
        titleArray.map( item => {
            const component = shallow(<MyHeader title={item} />);
            expect(component.find('Text').at(0).props().children).toBe(item);   
            expect(component).toMatchSnapshot();  
        })
    })

    it('menu display', () => {
        const component = shallow(<MyHeader menu={true} />);
        expect(component.find('TouchableWithoutFeedback').length).toBe(1);
        expect(component.find('Image').length).toBe(1);
        expect(component).toMatchSnapshot();  
    })

    it('menu hidden', () => {
        const component = shallow(<MyHeader menu={false} />);
        expect(component.find('View').length).toBe(3);
        expect(component).toMatchSnapshot();  
    })

    it('search display', () =>{
        const component = shallow(<MyHeader search={true} />);
        expect(component.find('Button').length).toBe(1);
        expect(component).toMatchSnapshot();
    })

    it('search hidden', () =>{
        const component = shallow(<MyHeader search={false} />);
        expect(component.find('Button').length).toBe(0);
        expect(component).toMatchSnapshot();
    })

    it('menu and search both display', () => {
        const component = shallow(<MyHeader menu={true} search={true} />);
        expect(component.find('TouchableWithoutFeedback').length).toBe(1);
        expect(component.find('Image').length).toBe(1);
        expect(component.find('View').length).toBe(2);
        expect(component.find('Button').length).toBe(1);
        expect(component).toMatchSnapshot();
    })

    it ('menu press', () => {
        const goToFunc = jest.fn();
        const navigation = { toggleDrawer: goToFunc };
        const component = shallow(<MyHeader menu={true} navigation={ navigation } />);
        component.find('TouchableWithoutFeedback').at(0).simulate('press');
        expect(goToFunc).toHaveBeenCalled(); 
    })

    it('search press', () => {
        const goToFunc = jest.fn();
        const navigation = { navigate: goToFunc };
        const component = shallow(<MyHeader search={true} navigation={ navigation } />);
        component.find('Button').at(0).simulate('press');
        expect(goToFunc).toHaveBeenCalled(); 
        expect(goToFunc).toHaveBeenCalledWith('Search');   
    })
});

