import Snapshot from './Snapshot';
import renderer from 'react-test-renderer';

it('renderuje się poprawnie', () => {
    const tree = renderer.create(<Snapshot />).toJSON();
    expect(tree).toMatchSnapshot();
})