const express = require('express');
const uuid = require ('..helpers/uuid');
const fs = require ('fs');
const dbJson = require('./db/db.json');
const unserNotes = dbJson && dbJson.length ? dbJson : [];

