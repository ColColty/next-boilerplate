import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { appWithTranslation } from "next-i18next";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(appWithTranslation( MyApp));
