#!/usr/bin/env bash

babel --presets react src --out-dir lib -- $*

babel-node handlebars-example.js
