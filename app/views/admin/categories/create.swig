{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block mainpanel %}
<form action="{{ actionUrl }}" name="itemForm"  method="post" class="form-horizontal form-bordered">
    {{ pageheader({title: "Page Category Management - Create Category", showSaveButton: true, showCloseButton: true}) }}
    <div class="contentpanel">
        {% include "app/views/admin/partials/messages.swig" %}
        <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-2">
                <h5 class="sm-title">Detail Tabs</h5>
                <ul class="nav nav-pills nav-stacked nav-msg">
                    <li role="presentation" class="active">
                        <a href="#tab-basics" aria-controls="tab-basics" role="tab" data-toggle="tab">Basics</a>
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