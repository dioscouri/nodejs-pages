{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block mainpanel %}
<form action="{{ actionUrl }}" method="post" class="form-horizontal form-bordered">
    {%
        include "app/views/admin/partials/pageheader.swig" with {
            'pageTitle': 'Page Management - Edit Page',
            'showSaveButton': true,
            'showCloseButton': true
        }
    %}
    <div class="contentpanel">
        {% include "app/views/admin/partials/messages.swig" %}
        <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-2">
                <h5 class="sm-title">Detail Tabs</h5>
                <ul class="nav nav-pills nav-stacked nav-msg">
                    <li role="presentation" class="active">
                        <a href="#tab-basics" aria-controls="tab-basics" role="tab" data-toggle="tab">Basics</a>
                    </li>
                    <li role="presentation">
                        <a href="#tab-categories" aria-controls="tab-categories" role="tab" data-toggle="tab">Categories</a>
                    </li>
                </ul>
            </div>
            <div class="col-sm-9 col-md-9 col-lg-10">
                {% include "_form.swig" %}
            </div>
        </div>
    </div>

</form>
{% endblock %}

{% block page_js %}
<script>
    {% include "pages.js" %}
</script>
{% endblock %}
