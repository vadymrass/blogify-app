import React from "react";
import { useForm } from "react-hook-form";
import Modal from "../BaseComponents/Dialog";
import Input from "../BaseComponents/Input/Input/Input";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { classicNameResolver } from "typescript";
import { makeStyles } from "@material-ui/styles";

// Form Props
interface FormValues {
  email: string;
  username: string;
  password: string;
}
// Component Props
interface Props {
  open: boolean;
  onCloseModal: () => void;
}

const useStyles = makeStyles((theme: any) => ({
  modal: {},
}));
const RegisterModal = (props: Props) => {
  const { open, onCloseModal } = props;
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    // TODO run register mutation
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        open={props.open}
        dialogTitle="Kayıt Ol"
        dialogContentTitle="Blogify'a kayıt ol ve bütün özelliklerden faydalan"
        className={classes.modal}
        width={900}
        onClose={onCloseModal}
      >
        <Input
          name="email"
          error={errors.email}
          fullWidth
          startIcon={<EmailIcon />}
          label="E-mail"
          control={control}
        />
        <Input
          name="email"
          error={errors.email}
          fullWidth
          startIcon={<EmailIcon />}
          label="E-mail"
          control={control}
        />
      </Modal>
    </form>
  );
};

export default RegisterModal;
