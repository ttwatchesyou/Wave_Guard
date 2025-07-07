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
    if (loading) return;

    const publicPaths = ["/Login", "/Register"];
    const path = router.pathname.toLowerCase();

    // ✅ ป้องกัน redirect ซ้ำ
    if (!isAuthenticated && !publicPaths.includes(path)) {
      if (path !== "/Login") {
        router.replace("/Login");
      }
    } else {
      setCheckingAuth(false);
    }
  }, [isAuthenticated, loading, router.pathname]);

  if (loading || checkingAuth) return null;

  return (
    <ConfigProvider theme={theme}>
      <MyApp {...props} />
    </ConfigProvider>
  );
}

// ✅ AuthProvider ครอบ RootApp
export default function RootApp(props: AppPropsWithLayout) {
  return (
    <AuthProvider>
      <AppWrapper {...props} />
    </AuthProvider>
  );
}
