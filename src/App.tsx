import './App.css';
import {Fragment, useState} from 'react';
import {Option, ReactCustomSelect} from './components/react-custom-select';

const App = () => {
	const [selectValue, setSelectValue] = useState('');
	
	return (
		<div className="App">
			<div className="select-group">
				<label htmlFor="nativeSelect">This is native select</label>
				<select id="nativeSelect" name="nativeSelect">
					<option value="First option">First option</option>
					<option value="Second option">Second option</option>
					<option value="Third option">Third option</option>
				</select>
			</div>
			<div className="select-group">
				<label htmlFor="customSelect">This is custom select</label>
				<ReactCustomSelect value={selectValue} callback={setSelectValue} id="customSelect">
					<Fragment>
						<Option value="Option 1">Option 1</Option>
						<Option value="Option 2">Option 2</Option>
						<Option value="Option 3">Option 3</Option>
						<span>ddd</span>
					</Fragment>
				</ReactCustomSelect>
			</div>
			<div className="select-group">
				<label htmlFor="nativeSelect">This is native select</label>
				<select id="nativeSelect" name="nativeSelect">
					<option value="First option">First option</option>
					<option value="Second option">Second option</option>
					<option value="Third option">Third option</option>
				</select>
			</div>
		</div>
	);
};

export default App;
