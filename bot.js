const twit = require('twit');
require('dotenv').config();

//config
const config = require('./config')



//making instance of twiter an passing the config
const twitter = new twit(config);