/* eslint-disable */
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { ConfigProvider } from "antd";
import Layout from "../../components/Layout/Layout";
import theme from "../../theme/themeConfig";
import "../styles/globals.css";
import "antd/dist/reset.css";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  const router = useRouter();

  useEffect(() => {
    // ตัวอย่างเช็ค token ใน localStorage
    const token = localStorage.getItem("token");

    // หน้าไหนที่ไม่ต้อง redirect เช่น login กับ register
    const publicPaths = ["/Login", "/Register"];

    // ถ้าไม่มี token และไม่ได้อยู่ในหน้า publicPaths ให้ไป login
    if (!token && !publicPaths.includes(router.pathname)) {
      router.push("/Login");
    }
  }, [router]);

  return (
    <ConfigProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ConfigProvider>
  );
}

export default MyApp;
