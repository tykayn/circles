// gloabl settings
levelMax = 6;
hexa = '0123456789ABCDEF'; // all colours
//hexa = '89ABCDEF'; // lightful colours
//hexa = '0123456'; // colours batman would like

//get a random colour
rColor = function() {
    var arr = hexa.split('');
    var color = '#';
    for (var i = 0; i < 3; i++) {
        color += arr[Math.floor(Math.random() * arr.length)];
    }
    return color;
}
// manages the 4 sub blocks with their deepness.
subBlocks = function(level) {
    var splittable = 1;
    if (level >= levelMax) {
        splittable = 0;
    }
    var b = '';
    for (var i = 0; i < 4; i++) {
        var color = rColor();
        var style = 'background : ' + color;
        var block = '  <div class="c block" style="' + style + '" data-level="' + level + '" data-splittable="' + splittable + '" data-bg="' + color + '"></div>';
        if (block !== undefined) {
            b += block;
        }

    }
    return b;
};

// set the width and height of splittable blocks
setSides = function() {
    
    var sets = 0;
    $('.c[data-splittable]').each(function(index, e) {
        var self = $(this);
        // var side = ( self.parent().width() / (self.data('level')*1 + 1)); 
        var side = (self.parent().width() / 2.01);
        css = {
            /* 'padding' : side +'px',*/
            'width': side + 'px',
            'height': side + 'px',
            'display': 'block'
        };
        self.css(css);
        sets++;
    })
//    console.log(' $(.c[data-splittable]) '+$('.c[data-splittable]').length)
//    console.log(' setSides x '+sets)



}

// splits a circle in four circles
splitCircle = function(obj, level) {

    $(obj)
            .data('level', 10)
            .data('splittable', 0)
            .removeClass('c')
            .css('background', '')
            // .append(level)
            .append(subBlocks(level));
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