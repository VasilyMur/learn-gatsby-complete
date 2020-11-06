import React from 'react';
import styled from 'styled-components';
import useForm from '../hooks/useForm';
import FormStyles from '../styles/FormStyles';

const SignupForm = () => {
  const {
    values,
    error,
    message,
    isLoading,
    captureInput,
    submitForm,
  } = useForm();

  return (
    <Container>
      <FormStyles onSubmit={submitForm}>
        <input
          disabled={isLoading}
          type="email"
          name="email"
          value={values.email}
          placeholder="Email"
          onChange={captureInput}
        />

        <input
          disabled={isLoading}
          type="garbage"
          name="garbage"
          value={values.garbage}
          className="garbage"
          onChange={captureInput}
        />

        <button disabled={isLoading} type="submit">
          {isLoading ? 'Отправляю запрос...' : 'Отправить'}
        </button>
      </FormStyles>
      <div>
        {error ? <span className="formError">Ошибка: {error}</span> : ''}
        {message ? <span className="formMessage">{message}</span> : ''}
      </div>
    </Container>
  );
};

export default SignupForm;

const Container = styled.div`
  .formError {
    font-size: 12px;
    text-transform: uppercase;
    color: rgb(254, 44, 85);
  }
  .formMessage {
    font-size: 12px;
    text-transform: uppercase;
    color: #00e640;
  }
`;
