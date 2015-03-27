/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Scrollview = require('famous/views/Scrollview');
    var Surface = require('famous/core/Surface');

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    mainContext.setPerspective(1000);

    var logo = new ImageSurface({
        size: [200, 200],
        content: '/content/images/famous_logo.png',
        classes: ['backfaceVisibility']
    });

    var initialTime = Date.now();
    var centerSpinModifier = new Modifier({
        align: [0.5, 0.5],
        origin: [0.5, 0.5],
        transform: function() {
            return Transform.rotateY(.002 * (Date.now() - initialTime));
        }
    });

    //mainContext.add(centerSpinModifier).add(logo);

    var scrollview = new Scrollview();
    var surfaces = [];

    scrollview.sequenceFrom(surfaces);

    for (var i = 0, temp; i < 80; i++) {
        temp = new Surface({
             content: 'Surface: ' + (i + 1),
             size: [undefined, 400],
             properties: {
                 backgroundColor: 'hsl(' + (i * 360 / 40) + ', 100%, 50%)',
                 lineHeight: '200px',
                 textAlign: 'center'
             }
        });

        temp.pipe(scrollview);
        surfaces.push(temp);
    }

    mainContext.add(scrollview);
});
