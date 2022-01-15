import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createPhoneNumber,
  PhoneNumberState,
  setCreatingNumber,
} from "../redux/phoneNumberSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { IStore } from "../types";
import { ContactState } from "../redux/contactSlice";

interface FormFields {
  number: string;
}

const schema = yup.object({
  number: yup
    .string()
    .required("No debe estar vacío")
    .matches(/^\+[1-9]\d{1,14}$/, "El número no es compatible"),
});

const CreatePhoneNumber = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
  });
  const { contact } = useSelector<IStore, ContactState>(
    (state) => state.contacts
  );
  const { createLoading } = useSelector<IStore, PhoneNumberState>(
    (state) => state.phoneNumbers
  );

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    dispatch(createPhoneNumber({ id: contact._id, number: data.number }));
  };

  return (
    <>
      {errors.number && (
        <Alert variant="danger" className="mb-1">
          {errors.number.message}
        </Alert>
      )}
      <Form
        className="d-flex mb-2 justify-content-between align-items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Control {...register("number")} placeholder="Ej: +999999999999" />
        <div className="d-flex ms-2">
          <Button type="submit" disabled={createLoading} variant="success">
            {createLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Confirmar"
            )}
          </Button>
          <Button
            className="ms-2"
            variant="danger"
            onClick={() => dispatch(setCreatingNumber(false))}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreatePhoneNumber;
