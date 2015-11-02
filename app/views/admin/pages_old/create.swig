{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "app/views/admin/partials/pageheader.swig" with { 'pageTitle': 'Pages Management - Create New Page'} %}
{% endblock %}

{% block pagecontent %}
    <div class="panel">
        <div class="panel-body">
            {% include "_form.swig" %}
        </div>
    </div>
{% endblock %}

{% block page_js %}
<script>
    jQuery(document).ready(function(){
        jQuery('#content').ckeditor();
        jQuery('#datepicker_start').datepicker({dateFormat: "mm/dd/yy"});
        jQuery('#datepicker_end').datepicker({dateFormat: "mm/dd/yy"});

        jQuery('#timepicker_start').timepicker({defaultTIme: false});
        jQuery('#timepicker_end').timepicker({defaultTIme: false});
    });
</script>
{% endblock %}