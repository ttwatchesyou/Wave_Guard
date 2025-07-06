import React from "react";
import styled from "styled-components";
import { Image, Layout } from "antd";

const { Footer } = Layout;

const MainFooterComponent = () => {
  return (
    <FooterSection></FooterSection>
    // <FooterSection>
    //   <WrapFooter>
    //     <SecFooterLogo alt="" preview={false} src="/Logo/Triple S.png" />
    //     <WrapTextFooter>
    //       <TextBox>
    //         <FooterHead>Service</FooterHead>
    //         <FooterDetail>Data Protection</FooterDetail>
    //         <FooterDetail>Fraud Prevention</FooterDetail>
    //         <FooterDetail>Payment Gateway</FooterDetail>
    //         <FooterDetail>Know Your Customer ( KYC )</FooterDetail>
    //         <FooterDetail>Education</FooterDetail>
    //       </TextBox>
    //       <TextBox>
    //         <FooterHead>Contacts</FooterHead>
    //         <FooterTitle>Phone</FooterTitle>
    //         <FooterDetail>+662-9999-9999</FooterDetail>
    //         <FooterTitle>Email</FooterTitle>
    //         <FooterDetail>triplesinc@gmail.com</FooterDetail>
    //         <FooterTitle>Address</FooterTitle>
    //         <FooterDetail>
    //           5 Ramkhamhaeng 97/1, Ramkhamhaeng Street, Hua Mak, Bangkapi
    //           Bangkok, Thailand 10240
    //         </FooterDetail>
    //       </TextBox>
    //     </WrapTextFooter>
    //   </WrapFooter>
    //   <CreditFooter>
    //     <WrapperFooter>
    //       <FooterCopyright>
    //         © 2024 Triple S Technology. All rights reserved.
    //       </FooterCopyright>
    //     </WrapperFooter>
    //   </CreditFooter>
    // </FooterSection>
  );
};
export default MainFooterComponent;

const WrapFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 32px;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;

  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 24px;
  }
  @media only screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
`;

const WrapTextFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 24px;

  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    flex-direction: row;
    gap: 16px;
  }
  @media only screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`;
const TextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 12px;
`;
const FooterHead = styled.h1`
  color: #fff;
  font-family: Prompt;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    font-size: 22px;
  }

  @media only screen and (max-width: 767px) {
    font-size: 22px;
  }
`;

const FooterDetail = styled.h2`
  display: flex;
  width: 283px;
  margin: 0px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #d9d6d6;
  font-family: Prompt;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px;
  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

const FooterTitle = styled.div`
  color: #d9d6d6;
  font-family: Prompt;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 36px; /* 180% */
`;

const FooterSection = styled(Footer)`
  width: 100%;
  background-color: #343434;
  padding: 24px;
  display: none;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const CreditFooter = styled.div`
  width: 100%;
  max-width: 1920px;
  min-height: 48px;
  /* padding: 0 80px 16px; */

  @media only screen and (max-width: 1240px) {
    /* padding: 0 50px 16px; */
  }
`;

const WrapperFooter = styled.div`
  width: 100%;
  padding-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--white-color);
  flex-wrap: wrap;
  gap: 16px;
  text-align: center;
`;

const SecFooterLogo = styled(Image)`
  width: 100%;
  max-width: 350px; /* จำกัดขนาดโลโก้ */

  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    dispay: none;
  }

  /* การตั้งค่าสำหรับโทรศัพท์มือถือ */
  @media only screen and (max-width: 767px) {
    max-width: 200px;
  }
`;

const FooterCopyright = styled.div`
  color: var(--white-color);
  font-size: 1rem;
  font-weight: 400;
  font-family: Inter;
  line-height: 1rem;
`;
