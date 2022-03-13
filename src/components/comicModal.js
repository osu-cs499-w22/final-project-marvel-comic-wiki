import { Modal, Button, Accordion } from 'react-bootstrap';
import styled from '@emotion/styled/macro';

const StyledModalTitle = styled(Modal.Title)`
	padding-left: 20px;
`;


export default function ComicModal(props) {
    console.log("title ===", props.title);
    console.log("description ===", props.description);
    console.log("events ===", props.events);
    console.log("series ===", props.series);
    console.log("comics ===", props.comics);


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
	  scrollable={true}
    >
      <Modal.Header closeButton>
        <StyledModalTitle id="contained-modal-title-vcenter">
          {props.title}
        </StyledModalTitle>
      </Modal.Header>
      
	  <Modal.Body>
		
		<Accordion flush>
			<Accordion.Item eventKey="Description">
				<Accordion.Header><h4>Description</h4></Accordion.Header>
				<Accordion.Body>
					<p>{props.description}</p>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
		
		<Accordion flush>
			<Accordion.Item eventKey="Events">
				<Accordion.Header><h4>Events</h4></Accordion.Header>
				<Accordion.Body>
					{(!props.events.length) ? 
						<p>Not Available</p>
						:
						<ul>
							{props.events.map(item => 
								<li key={item.name}>{item.name}</li>
							)}
						</ul>
					}
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
		
		<Accordion flush>
			<Accordion.Item eventKey="Characters">
				<Accordion.Header><h4>Characters</h4></Accordion.Header>
				<Accordion.Body>
					{(!props.characters.length) ? 
						<p>Not Available</p>
						:
						<ul>
							{props.characters.map(item => 
								<li key={item.name}>{item.name}</li>
							)}
						</ul>
					}
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
		
		<Accordion flush>
			<Accordion.Item eventKey="Creators">
				<Accordion.Header><h4>Creators</h4></Accordion.Header>
				<Accordion.Body>
					{(!props.creators.length) ? 
						<p>Not Available</p>
						:
						<ul>
							{props.creators.map(item => 
								<li key={item.name}>{item.name}</li>
							)}
						</ul>
					}
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
		
      </Modal.Body>
      
	  <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}