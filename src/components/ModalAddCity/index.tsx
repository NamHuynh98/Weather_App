import React from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

type Props = {
  onSendCity: (name: string) => void;
  isLoading: boolean;
  show: boolean;
  onHide: () => void;
};

const ModalAddCity: React.FC<Props> = (props) => {
  const [nameCity, setNameCity] = React.useState<string>("");

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Choose a city
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup size="sm" className="mb-1">
          <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
          <Form.Control
            disabled={props.isLoading}
            onChange={(e) => setNameCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") props.onSendCity(nameCity);
            }}
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          size="sm"
          onClick={props.onHide}
          type="button"
        >
          Close
        </Button>
        <Button
          variant="success"
          size="sm"
          type="button"
          disabled={props.isLoading}
          onClick={() => {
            props.onSendCity(nameCity);
            setNameCity("");
          }}
        >
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddCity;
