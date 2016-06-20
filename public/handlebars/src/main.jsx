'use strict'
// react
import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

import MainMenu from './MainMenu'

const menu = [
  { href: "/", title: "Home" },
  { href: "/services", title: "Services" },
  { href: "/contact", title: "Conact Us" },
  { href: "/about", title: "About" },
];

module.exports = ReactDOMServer.renderToStaticMarkup(<MainMenu menu={menu}/>);
