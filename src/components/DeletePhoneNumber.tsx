import { FC } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deletePhoneNumber,
  setDeletingNumber,
} from "../redux/phoneNumberSlice";
import { IPhoneNumber } from "../types";

interface Props {
  phoneNumber: IPhoneNumber;
  index: number;
}

const DeletePhoneNumber: FC<Props> = ({ phoneNumber, index }) => {
  const dispatch = useDispatch();
  return (
    <div className="d-flex flex-grow-1 justify-content-evenly">
      <Button
        disabled={phoneNumber.loading}
        variant="success"
        onClick={() =>
          dispatch(deletePhoneNumber({ id: phoneNumber._id, i: index }))
        }
      >
        {phoneNumber.loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          "Confirmar"
        )}
      </Button>
      <Button
        className="ms-2"
        variant="danger"
        onClick={() => dispatch(setDeletingNumber({ value: false, i: index }))}
      >
        Cancelar
      </Button>
    </div>
  );
};

export default DeletePhoneNumber;
