// gloabl settings
levelMax = 6; // default is 6 like the circles demo
hexa = '0123456789ABCDEF'; // all colours
//hexa = '89ABCDEF'; // lightful colours
//hexa = '0123456'; // colours batman would like

hexLength = 6 ; // 3 or 6. the length of hexacolour code to be generated
sideDivider = 2.03; // divide with a floating number since 2 would make a back return of the circles.

//get a random colour
rColor = function() {
    var color = '#';
    for (var i = 0; i < hexLength; i++) {
        color += hexa[Math.floor(Math.random() * hexa.length)];
    }
    return color;
}

//mixing colours
mixColors = function(selfcol, rcol) {
    var newCol = '#';
    // average of each hexcode
    for (var i = 1; i < selfcol.length; i++) {
        var a = hexa.indexOf(selfcol[i]);
        if( a == -1){
            a = 5;
        }
        var b = hexa.indexOf(rcol[i]);
        if( b == -1){
            b = 5;
        }
        var ab = Math.round((a*1 + b*1) / 2);
    //    console.log(' a + b = ab ' + a + ' + ' + b + '  = ' + ( (a*1 + b*1) / 2))
        newCol += hexa[ab];
    }
    console.log('mixcolors ' + selfcol + ' ' + rcol + ' = ' + newCol);
    return newCol;
}


// manages the 4 sub blocks with their deepness.
subBlocks = function(level, selfCol) {
    var splittable = 1;
    if (level >= levelMax) {
        splittable = 0;
    }
    var b = '';
    for (var i = 0; i < 4; i++) {
        var rcol = rColor();

        var color = mixColors(selfCol, rcol);
        var color = mixColors(selfCol, color);
        var color = mixColors(selfCol, color);
        var color = mixColors(selfCol, color);
        var color = mixColors(selfCol, color);
        var style = 'background : ' + color;
        var block = '  <div class="c block sub" style="' + style + '" data-level="' + level + '" data-splittable="' + splittable + '" data-bg="' + color + '"></div>';
        if (block !== undefined) {
            b += block;
        }

    }
    return b;
};

// set the width and height of splittable blocks
setSides = function() {
    $('.c[data-splittable]').each(function(index, e) {
        var self = $(this);
        var side = Math.floor(self.parent().width() / sideDivider);
        css = {
            'width': side + 'px',
            'height': side + 'px',
            'display': 'block'
        };
        self.css(css);
    })
    $('.sub').removeClass('sub'); // for transition

}

// splits a circle in four circles
splitCircle = function(obj, level) {
    var self = $(obj);
    var selfCol = self.data('bg');
    if( selfCol == '#' || ''){
        var selfCol = '#fff';
    }
    
// var selfCol = self.css('background-colour');
    console.log('selfCol ');
    console.log(selfCol);

    self.data('level', 10)
            .data('splittable', 0)
            .removeClass('c')
            .css('background', '')
            .append(subBlocks(level, selfCol));
    init();
};

// checks the circle is ready to be splitted
checkCircle = function() {
    var self = $(this);
    var level = self.data('level');
    if (level < levelMax) {
        self
        splitCircle(self, level + 1);
    }
};

init = function() {
    setSides();
    $('.c[data-splittable=1]').on('mouseenter', checkCircle);
}
init()

console.log('\'Allo \'Allo!');