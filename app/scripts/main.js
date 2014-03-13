w = $(window).width();
h = $(window).height();
levelMax = 5;

//get a random colour
rColor = function() {
    hexa = '0123456789ABCDEF';
    var arr = hexa.split('');
    var color = '#';
    for (var i = 0; i < 3; i++) {
        color += arr[Math.floor(Math.random() * arr.length)];
    }
    console.log(color);
    return color;
}
// manages the 4 sub blocks with their deepness.
subBlocks = function(level) {
    var splittable = 1;
    if(level >= levelMax){
        splittable = 0;
    }
    var b ='';
    for (var i = 0; i < 2; i++) {
        var style = 'background : ' + rColor();
        var block = '  <div class="c block" style="' + style + '" data-level="' + level + '" data-splittable="'+splittable+'"></div>';
        if (block !== undefined) {
            b += block;
        }

    }
    console.log('b ' + b)
    return b;
};

// set the width and height of splittable blocks
setSides = function() {
    $('.c[data-splittable]').each( function(index, e){
        var self = $(this);
       // var side = ( self.parent().width() / (self.data('level')*1 + 1)); 
        var side = ( self.parent().width() / 2.1); 
        css = {
           /* 'padding' : side +'px',*/
            'width':  side +'px',
            'height':  side +'px',
            'display' : 'block'
        };
        self.css(css);
        console.log( ' level: '+ self.data('level'))
        console.log('sides done : side ' + side);
    })
    
    
    

}

// splits a circle in four circles
splitCircle = function(obj, level) {

        $(obj)
                .data('level', 10)
                .data('splittable', 0)
                .removeClass('c')
                // .append(level)
                .append(subBlocks(level));
        init();
};

// checks the circle is ready to be splitted
checkCircle = function() {
    var self = $(this);

    var level = self.data('level');
    

    if (level < levelMax) {
        console.log('level' + level);
        self
                //.html(':o____')
                .css('background', 'green');
        splitCircle(self, level + 1);
    }
};
init = function() {
    setSides();
    $('.c[data-splittable=1]').on('mouseenter', checkCircle);

}
init()

console.log('\'Allo \'Allo!');