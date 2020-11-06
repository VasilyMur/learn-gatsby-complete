import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import SignupForm from './SignupForm';

const Footer = ({ siteTitle }) => (
  <Container>
    <WrapperForm>
      <legend>
        <span className="formAction">Подписаться </span>на нашу рассылку!
      </legend>
      <SignupForm />
    </WrapperForm>

    <WrapperMain>
      © {new Date().getFullYear()}
      {` `}
      <Link to="/">{siteTitle}</Link>
    </WrapperMain>
  </Container>
);

export default Footer;

const Container = styled.div`
  background: ${props => props.theme.black};
  color: #fff;
`;
const WrapperForm = styled.div`
  max-width: 485px;
  margin: 0 auto;
  padding: 60px 0;
  .formAction {
    color: ${props => props.theme.yellow};
    font-weight: 900;
  }
  legend {
    margin-bottom: 15px;
  }
`;

const WrapperMain = styled.div`
  background: #fff;
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;
  padding: 20px;
  color: ${props => props.theme.black};
  a {
    color: ${props => props.theme.black};
  }
`;
