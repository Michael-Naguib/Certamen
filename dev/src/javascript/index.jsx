"use strict";

// ============== Set up imports for webpack bundle... explicitly list======================

//========== REACT==================
import React from 'react';
import ReactDOM from 'react-dom';

//========== Material ui ===========
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
injectTapEventPlugin();

// ================================== Main Code =========================================

//==================== Question Form Page =======================
/*
    goals:  good ux, auto check on user stop typing, store files in a global object
*/



