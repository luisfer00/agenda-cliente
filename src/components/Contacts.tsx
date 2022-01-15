import { FC } from "react";
import {} from "react-bootstrap";
import { IContact } from "../types";
import Contact from "./Contact";

interface Props {
  contacts: IContact[];
}

const Contacts: FC<Props> = ({ contacts }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {contacts.map((contact, i) => (
        <Contact key={i} contact={contact} />
      ))}
    </div>
  );
};

export default Contacts;
