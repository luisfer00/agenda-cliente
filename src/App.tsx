import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row, Button, Spinner } from "react-bootstrap";
import Contacts from "./components/Contacts";
import { IStore } from "./types";
import {
  getContacts,
  ContactState,
  setCreatingContact,
} from "./redux/contactSlice";
import CreateContact from "./components/CreateContact";
import PhoneNumbers from "./components/PhoneNumbers";

function App() {
  const dispatch = useDispatch();
  const { contacts, contact, loading, creatingContact } = useSelector<
    IStore,
    ContactState
  >((state) => state.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="my-2 text-center px-lg-5" md={6} xs={10}>
          {creatingContact ? (
            <CreateContact />
          ) : contact.name ? (
            <PhoneNumbers />
          ) : !loading ? (
            <>
              <Button
                variant="success"
                className="my-2"
                onClick={() => dispatch(setCreatingContact(true))}
              >
                Crear Contacto
              </Button>
              <Contacts contacts={contacts} />
            </>
          ) : (
            <Spinner animation="border" />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
