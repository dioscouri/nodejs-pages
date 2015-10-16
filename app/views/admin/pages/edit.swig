{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "app/views/admin/partials/pageheader.swig" with { 'pageTitle': 'Pages Management - Edit Page'} %}
{% endblock %}

{% block pagecontent %}
    <div class="panel">
        <div class="panel-body">
            {% include "_form.swig" %}
        </div>
    </div>
{% endblock %}

<script>
    jQuery(document).ready(function(){
        CKEDITOR.replace('content');

        jQuery('#datepicker_start').datepicker({
            dateFormat: "mm/dd/yy"
        });
        jQuery('#datepicker_end').datepicker({
            dateFormat: "mm/dd/yy"
        });
    });
</script>

{% block page_js %}
<script>
    jQuery(document).ready(function(){
        jQuery('#content').ckeditor();
    });
</script>
{% endblock %}
