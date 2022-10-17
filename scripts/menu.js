$(document).ready(function() {
    function closeMenu() {
        $("#menu").animate({"left": "-=250px"}, "normal", function() {
            $(this).removeClass("out");
        });
        $("#lnk-mobile-menu").animate({left: "-=250"}, 400);
        $("#wrapper").animate({left: "-=250"}, 400).css("position","relative");
    }

    $("#lnk-mobile-menu").click(function(e) {
        e.stopPropagation();
		if($("#menu").hasClass("out")) {
            closeMenu();
		} else {
			$("#menu").addClass("out");
			$("#menu").animate({left: "+=250"}, 400);
			$("#lnk-mobile-menu").animate({left: "+=250"}, 400);
			$("#wrapper").animate({left: "+=250"}, 400).css("position","fixed");
		}
        return false;
	});
    
    $("#wrapper").click(function() {
        if($("#menu").hasClass("out")) {
            closeMenu();
        }
    });
    
    $(window).on('resize', function() {
        if($(window).width() > 768) {
            if($("#menu").hasClass("out")) {
                closeMenu();           
            }
        }
    });    
});
