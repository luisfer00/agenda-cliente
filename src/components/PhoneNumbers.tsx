import { useEffect } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ContactState,
  deleteContact,
  setContact,
  setDeletingContact,
  setEditingContact,
  updateContact,
} from "../redux/contactSlice";
import { IStore } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  getPhoneNumbers,
  PhoneNumberState,
  setCreatingNumber,
} from "../redux/phoneNumberSlice";
import PhoneNumber from "./PhoneNumber";
import CreatePhoneNumber from "./CreatePhoneNumber";

interface FormFields {
  name: string;
}

const schema = yup.object({
  name: yup.string().required("No debe estar vacío"),
});

const PhoneNumbers = () => {
  const dispatch = useDispatch();
  const {
    contact,
    editingContact,
    deletingContact,
    loading: contactLoading,
  } = useSelector<IStore, ContactState>((state) => state.contacts);
  const {
    phoneNumbers,
    loading: phoneNumberLoading,
    creatingNumber,
  } = useSelector<IStore, PhoneNumberState>((state) => state.phoneNumbers);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
    defaultValues: { name: contact.name },
  });

  useEffect(() => {
    dispatch(getPhoneNumbers(contact._id));
  }, [dispatch, contact._id]);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    if (data.name === contact.name) return dispatch(setEditingContact(false));

    dispatch(updateContact({ _id: contact._id, name: data.name }));
  };

  return (
    <div>
      <div className="d-flex justify-content-evenly">
        <Button
          className="mb-2"
          variant="danger"
          onClick={() =>
            dispatch(
              setContact({
                _id: "",
                name: "",
              })
            )
          }
        >
          Salir
        </Button>
        <Button
          className="mb-2"
          variant="success"
          onClick={() => dispatch(setCreatingNumber(true))}
        >
          Crear Número
        </Button>
      </div>
      {errors.name && (
        <Alert className="mb-2" variant="danger">
          {errors.name.message}
        </Alert>
      )}
      <div className="d-flex justify-content-between align-items-center w-100">
        {editingContact ? (
          <Form
            className="d-flex justify-content-between flex-grow-1 align-items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Control className="w-50" {...register("name")} />
            <div className="d-flex">
              <Button
                disabled={contactLoading}
                type="submit"
                className="ms-2"
                variant="success"
              >
                {contactLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Confirmar"
                )}
              </Button>
              <Button
                className="ms-2"
                variant="danger"
                onClick={() => dispatch(setEditingContact(false))}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        ) : deletingContact ? (
          <div className="d-flex flex-grow-1 justify-content-evenly">
            <Button
              disabled={contactLoading}
              type="submit"
              variant="success"
              onClick={() => dispatch(deleteContact(contact._id))}
            >
              {contactLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Confirmar"
              )}
            </Button>
            <Button
              variant="danger"
              onClick={() => dispatch(setDeletingContact(false))}
            >
              Cancelar
            </Button>
          </div>
        ) : (
          <>
            <h3 className="m-0">{contact.name}</h3>
            <div className="d-flex">
              <Button
                className="ms-2"
                variant="warning"
                onClick={() => dispatch(setEditingContact(true))}
              >
                Editar
              </Button>
              <Button
                className="ms-2"
                variant="danger"
                onClick={() => dispatch(setDeletingContact(true))}
              >
                Eliminar
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="py-3">
        {creatingNumber && <CreatePhoneNumber />}
        {phoneNumberLoading ? (
          <Spinner animation="border" />
        ) : (
          phoneNumbers.map((phoneNumber, i) => (
            <PhoneNumber key={i} index={i} phoneNumber={phoneNumber} />
          ))
        )}
      </div>
    </div>
  );
};

export default PhoneNumbers;
