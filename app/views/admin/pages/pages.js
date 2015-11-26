jQuery(document).ready(function(){
    jQuery('#datepicker_start').datepicker({dateFormat: "mm/dd/yy"});
    jQuery('#datepicker_end').datepicker({dateFormat: "mm/dd/yy"});

    jQuery('#timepicker_start').timepicker({defaultTIme: false});
    jQuery('#timepicker_end').timepicker({defaultTIme: false});

    if (CKEDITOR && $("[name='content']").length) {
        CKEDITOR.replace('content');
    }

    $('.refresh-slug').click(function() {
        $('#slug').val($('#title').val().toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-'));
    });
});