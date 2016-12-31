'use strict'

var md5 = require('md5');

const size = 25;
const pictureContainer = $('#gravatar');
const url = `https://www.gravatar.com/avatar/${md5(pictureContainer.html().trim().toLowerCase())}?s=${size}`;

pictureContainer.toggle();
pictureContainer.html($(`<img></img>`)
                .attr('src',url)
                .attr('alter','profile picture')
);