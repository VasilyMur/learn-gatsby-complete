import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import 'normalize.css';
import { StaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';

const theme = {
  black: '#262626',
  yellow: '#ffc600',
  lightgrey: '#efefef',
  grey: '#3A3A3A',
  blue: '##0050ff',
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Content = styled.div`
  max-width: 900px;
  min-height: 40vw;
  padding: 6rem 1rem;
  margin: 0 auto;
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StyledPage>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              {
                name: 'description',
                content: data.site.siteMetadata.description,
              },
            ]}
          >
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext"
              rel="stylesheet"
            />
            <link rel="canonical" href="https://fresh.blog" />
          </Helmet>
          <Header siteTitle={data.site.siteMetadata.title} />
          <Content>{children}</Content>
          <Footer siteTitle={data.site.siteMetadata.title} />
        </StyledPage>
      </ThemeProvider>
    )}
  />
);

export default Layout;
