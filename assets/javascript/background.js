$(document).ready(function() {
    $(".dropup-menu").hide();
    $('link[href*="pikachu.css"]').prop('disabled', true);
    $('link[href*="star-wars.css"]').prop('disabled', true);
    $('link[href*="mickey"]').prop('disabled', true);
    $("#dropupB").on('click',function(event){  
        $('.dropup-menu').toggle();
        return false;
});
    $("#original").on("click", function(event){
        $('link[href*="pikachu.css"]').prop('disabled', true);
        $('link[href*="star-wars.css"]').prop('disabled', true);
        $('link[href*="style.css"]').prop('disabled', false);
        $('link[href*="mickey"]').prop('disabled', true);
    });
    $("#pikachu").on("click", function(event){
        $('link[href*="pikachu.css"]').prop('disabled', false);
        $('link[href*="star-wars.css"]').prop('disabled', true);
        $('link[href*="style.css"]').prop('disabled', true);
        $('link[href*="mickey"]').prop('disabled', true);
    
    });
    $("#star-wars").on("click", function(event){
        $('link[href*="pikachu.css"]').prop('disabled', true);
        $('link[href*="star-wars.css"]').prop('disabled', false);
        $('link[href*="style.css"]').prop('disabled', true);
        $('link[href*="mickey"]').prop('disabled', true);
    });
    $("#mickeyM").on("click", function(event){
        $('link[href*="pikachu.css"]').prop('disabled', true);
        $('link[href*="star-wars.css"]').prop('disabled', true);
        $('link[href*="mickey.css"]').prop('disabled', false);
        $('link[href*="style.css"]').prop('disabled', true);
    });
});