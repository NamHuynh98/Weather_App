import { Toast } from "react-bootstrap";

type Props = {
  onClose: () => void;
  show: boolean;
  type: string;
  msg: string;
};

export const TYPE_TOAST = {
  SUCCESS: "Success",
  DANGER: "Danger",
  WARNING: "Warning",
};

const ToastComponent: React.FC<Props> = ({ onClose, show, type, msg }) => {
  return (
    <Toast
      onClose={onClose}
      show={show}
      delay={3000}
      bg={type.toLowerCase()}
      autohide
      style={{ zIndex: 9999 }}
      className="position-fixed top-0 end-0 m-3"
    >
      <Toast.Header>
        <strong className="me-auto">{type}</strong>
      </Toast.Header>
      <Toast.Body className="text-white fw-bolder">{msg}</Toast.Body>
    </Toast>
  );
};

export default ToastComponent;
