$(function() {
    var g = $('#game');
    g.addClass('context');

    //Disable context menu on the game div
    g.mouseover(function(e) {
        $(document).bind('contextmenu', function() {
            return $(e.target).hasClass('context');
        });
    });
    g.mouseout(function(e) {
        $(document).unbind('contextmenu');
    });
});