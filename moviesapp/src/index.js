import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import {IntlProvider} from 'react-intl';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import MovieList from "./components/movielist";
const userLang = navigator.language || navigator.userLanguage;
const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
  <IntlProvider locale={userLang} messages={userLang.includes("es")?localeEsMessages:localeEnMessages}>
      <MovieList />
  </IntlProvider>
);

serviceWorkerRegistration.register();