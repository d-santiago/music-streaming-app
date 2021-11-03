import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Buttongroup';

import { useState } from 'react';

const Song = (props) => {
	const [toggleLiked, setToggleLiked] = useState(false);

	const likeButton = (toggleLiked ?
		(<Button onClick={() => setToggleLiked(false)} variant="primary" ><i class="fa fa-check"></i></Button>) :
		(<Button onClick={() => setToggleLiked(true)} variant="secondary" ><i class="fa fa-plus"></i></Button>)
	)

	return (
		<div class="d-flex justify-content-between align-items-center p-3 music">
            <div class="d-flex flex-row align-items-center"> 
            <i class="fas fa-play p-2 text-primary"></i> 
            <small class="ml-2">R Kelly - Thoia Toing</small> 
            </div> 

            <Dropdown as={ButtonGroup}>
				{likeButton}

				<Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />

				<Dropdown.Menu>
			    	<Dropdown.Item href="#/action-1">Workout</Dropdown.Item>
			    	<Dropdown.Item href="#/action-2">Lo-fi hip hop beats</Dropdown.Item>
			    	<Dropdown.Item href="#/action-3">Party songs</Dropdown.Item>
			  	</Dropdown.Menu>
			</Dropdown>
        </div>

	)
}

export default Song;