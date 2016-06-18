'use strict'
// react
import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

import MainMenu from './MainMenu'

console.log(ReactDOMServer.renderToStaticMarkup(<MainMenu/>));
