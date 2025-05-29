/* eslint-disable */
import { useEffect } from "react";
import { useRouter } from "next/router";

const ScrollToTop = () => {
  const { asPath } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [asPath]);

  return null;
};

export default ScrollToTop;
