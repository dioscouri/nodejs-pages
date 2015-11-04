{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "app/views/admin/partials/pageheader.swig" with {
        'pageTitle': 'Page Category Details',
        'showEditButton': true,
        'showCloseButton': true
    } %}
{% endblock %}

{% block pagecontent %}
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
        <div class="tab-content">
            <!-- Basics attributes -->
            <div role="tabpanel" class="tab-pane active" id="tab-basics">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h1>{{ item.name }}</h1>
                        <p>url: <a href="/pages/categories/{{ item.slug }}">{{ item.slug }}</a></p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
{% endblock %}
