// components/Layout/index.tsx

import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import { Layout as AntLayout } from "antd";

import StyledHeader from "../Header";
import Footer from "../Footer";
import ScrollToTop from "../../utils/ScrollToTop";

const { Content } = AntLayout;

interface AppLayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  showMainFooter?: boolean;
  isFullscreen?: boolean;
}

const Layout = ({
  children,
  hideNavbar = false,
  hideFooter = false,
  showMainFooter = false,
  isFullscreen = false,
}: AppLayoutProps) => {
  return (
    <>
      <ScrollToTop />
      <StyledLayout>
        {!hideNavbar && !isFullscreen && <StyledHeader />}

        <StyledContent isFullscreen={isFullscreen}>{children}</StyledContent>

        {!hideFooter && !showMainFooter && !isFullscreen && <Footer />}
        {showMainFooter && !isFullscreen && <Footer />}
      </StyledLayout>
    </>
  );
};

export default Layout;

const StyledLayout = styled(AntLayout)`
  min-height: 100dvh;
`;

const StyledContent = styled(Content)<{ isFullscreen?: boolean }>`
  width: 100%;
  height: ${({ isFullscreen }) => (isFullscreen ? "100%" : "auto")};
  background-color: #ffffff;
  overflow-y: auto;
  margin-top: -80px;

  ::-webkit-scrollbar {
    display: none;
  }
`;
