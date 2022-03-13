import { Modal, Button, Accordion } from 'react-bootstrap';
import styled from '@emotion/styled/macro';

const StyledModalTitle = styled(Modal.Title)`
	padding-left: 20px;
`;


export default function CreatorModal(props) {
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
          {props.name}
        </StyledModalTitle>
      </Modal.Header>
      
	  <Modal.Body>

	  <Accordion flush>
			<Accordion.Item eventKey="Series">
				<Accordion.Header><h4>Series</h4></Accordion.Header>
				<Accordion.Body>
					{(!props.series.length) ? 
						<p>Not Available</p>
						:
						<ul>
							{props.series.map(item => 
								<li key={item.name}>{item.name}</li>
							)}
						</ul>
					}
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>

      <Accordion flush>
			<Accordion.Item eventKey="Stories">
				<Accordion.Header><h4>Stories</h4></Accordion.Header>
				<Accordion.Body>
					{(!props.stories.length) ? 
						<p>Not Available</p>
						:
						<ul>
							{props.stories.map(item => 
								<li key={item.name}>{item.name}</li>
							)}
						</ul>
					}
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>

		<Accordion flush>
			<Accordion.Item eventKey="Comics">
				<Accordion.Header><h4>Comics</h4></Accordion.Header>
				<Accordion.Body>
					{(!props.comics.length) ? 
						<p>Not Available</p>
						:
						<ul>
							{props.comics.map(item => 
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