jQuery(document).ready(function(){
    $('.refresh-slug').click(function() {
        $('#slug').val($('#name').val().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-'));
    });
});