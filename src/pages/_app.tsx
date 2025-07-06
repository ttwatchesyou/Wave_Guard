/* eslint-disable */
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import {
  ReactElement,
  ReactNode,
  useEffect,
  useContext,
  useState,
} from "react";
import { useRouter } from "next/router";
import { ConfigProvider } from "antd";
import Layout from "../../components/Layout/Layout";
import theme from "../../theme/themeConfig";
import "../styles/globals.css";
import "antd/dist/reset.css";
import { AuthProvider } from "@/context/authContext";
import AuthContext from "@/context/authContext";
import React from "react";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return <>{getLayout(<Component {...pageProps} />)}</>;
}

function AppWrapper(props: AppPropsWithLayout) {
  const router = useRouter();
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (loading) return; // รอโหลด token

    const publicPaths = ["/Login", "/Register"];
    const path = router.pathname.toLowerCase();

    if (!isAuthenticated && !publicPaths.includes(path)) {
      router.push("/Login");
    } else {
      setCheckingAuth(false);
    }
  }, [isAuthenticated, loading, router]);

  if (loading || checkingAuth) return null; // หรือแสดง loading spinner

  return (
    <ConfigProvider theme={theme}>
      <MyApp {...props} />
    </ConfigProvider>
  );
}

// ให้ AuthProvider ครอบ RootApp ทั้งหมด
export default function RootApp(props: AppPropsWithLayout) {
  return (
    <AuthProvider>
      <AppWrapper {...props} />
    </AuthProvider>
  );
}
