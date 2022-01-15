import { FC } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setDeletingNumber, setEditingNumber } from "../redux/phoneNumberSlice";
import { IPhoneNumber } from "../types";
import DeletePhoneNumber from "./DeletePhoneNumber";
import EditPhoneNumber from "./EditPhoneNumber";

interface Props {
  phoneNumber: IPhoneNumber;
  index: number;
}

const PhoneNumber: FC<Props> = ({ phoneNumber, index }) => {
  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-grow-1 justify-content-between align-items-center mb-2">
      {phoneNumber.editing ? (
        <EditPhoneNumber index={index} phoneNumber={phoneNumber} />
      ) : phoneNumber.deleting ? (
        <DeletePhoneNumber index={index} phoneNumber={phoneNumber} />
      ) : (
        <>
          <h4 className="m-0">{phoneNumber.number}</h4>
          <div className="d-flex">
            <Button
              className="ms-2"
              variant="warning"
              onClick={() =>
                dispatch(setEditingNumber({ value: true, i: index }))
              }
            >
              Editar
            </Button>
            <Button
              className="ms-2"
              variant="danger"
              onClick={() =>
                dispatch(setDeletingNumber({ value: true, i: index }))
              }
            >
              Eliminar
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PhoneNumber;
