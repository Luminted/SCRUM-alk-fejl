'use strict'

var md5 = require('md5');

const emailContainer = $('#profilePicture > small');
const pictureContainer = $('#profilePicture');
const url = `https://www.gravatar.com/avatar/${md5(emailContainer.html().trim().toLowerCase())}`

pictureContainer.html($(`<img></img>`)
                                    .attr('src',url)
                                    .attr('alter','profile picture')
);