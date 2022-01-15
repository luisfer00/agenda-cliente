import { FC } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setContact } from "../redux/contactSlice";
import { IContact } from "../types";

interface Props {
  contact: IContact;
}

const Contact: FC<Props> = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <Button
      className="m-2"
      size="lg"
      onClick={() => {
        dispatch(setContact(contact));
      }}
    >
      {contact.name}
    </Button>
  );
};

export default Contact;
