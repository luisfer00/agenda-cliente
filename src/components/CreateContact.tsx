import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ContactState,
  createContact,
  setCreatingContact,
} from "../redux/contactSlice";
import { IStore } from "../types";

interface FormFields {
  name: string;
}

const schema = yup.object({
  name: yup.string().required("No debe estar vacío"),
});

const CreateContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const { loading } = useSelector<IStore, ContactState>(
    (state) => state.contacts
  );

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    dispatch(createContact(data.name));
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={() => dispatch(setCreatingContact(false))}
        className="mb-1"
      >
        Salir
      </Button>
      {errors.name && (
        <Alert variant="danger" className="mb-1">
          {errors.name.message}
        </Alert>
      )}
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex align-items-center justify-content-between"
      >
        <Form.Control placeholder="Nombre" {...register("name")}></Form.Control>
        <Button disabled={loading} type="submit" variant="success" className="ms-1">
          {loading ? <Spinner animation="border" size="sm" /> : "Guardar"}
        </Button>
      </Form>
    </>
  );
};

export default CreateContact;
