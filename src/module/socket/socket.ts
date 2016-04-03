/// <reference path="../../../typings/browser.d.ts" />

import io = require("socket.io-client");
let socket = io.connect("http://localhost:3000");
export = socket;
