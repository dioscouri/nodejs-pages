{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block mainpanel %}
    {{ pageheader({title: "Pages Management"}) }}
    <div class="contentpanel">
        {% include "app/views/admin/partials/messages.swig" %}
        <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-2">
                <p><a href="{{ createUrl }}" class="btn btn-success btn-block btn-create-msg">Create New</a></p>
                {{ search() }}
            </div>
            <div class="col-sm-9 col-md-9 col-lg-10">
                <div class="msg-header">
                    <div class="pull-right">
                        <h5 class="sm-title text-right">{{ pagination_summary() }}</h5>
                        <div class="pull-right">
                            {{ pagination_pages() }}
                        </div>
                    </div>
                    {{ bulk_actions({check: true, bulkDelete: true}) }}
                </div>
                <div class="list-group media-list msg-list">
                    <div class="list-group-item list-group-sorting">
                        <div class="">
                            Sort by:
                            <a class="btn btn-link sorting" data-sortable="name">Title</a>
                            <a class="btn btn-link sorting">Slug</a>
                        </div>
                    </div>
                    <!-- list-group-sorting -->
                    {% if items.length > 0 %}
                    {% for row in items %}
                    {% set id = row.id %}
                    {% set editUrl = baseUrl + '/' + row.id + '/edit' %}
                    {% set viewUrl = baseUrl + '/' + row.id %}
                    {% set deleteUrl = baseUrl + '/' + row.id + '/delete' %}
                    <div class="list-group-item">
                        <div class="ckbox ckbox-primary pull-left">
                            <input type="checkbox" id="checkbox_{{ row.id }}" name="selectedItems" value="{{ row.id }}"><label for="checkbox_{{ row.id }}"></label>
                        </div>
                        <div class="list-group-item-body">
                            <div class="pull-right media-option">
                                <small style="display: none;">July 10 1:10pm</small>
                                <div class="btn-group">
                                    <a class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                        <i class="fa fa-cog"></i>
                                    </a>
                                    <ul class="dropdown-menu pull-right" role="menu">
                                        <li><a href="{{ viewUrl }}">View</a></li>
                                        <li>
                                            <a href="javascript:void(0)"
                                               onclick="if (confirm('Are you sure you want to delete this record?')) {document.location.href = '{{ deleteUrl }}';}">Delete</a>
                                        </li>
                                        <li class="divider"></li>
                                        <li><a href="/pages/{{ row.slug }}" target="_blank" >Preview</a></li>
                                    </ul>
                                </div>
                            </div>
                            <a href="{{ viewUrl }}"><h4 class="sender">{{ row.title }}</h4></a>
                            <p>Slug: <b>{{ row.slug }}</b> Status: <b>{{ row.publication.status }}</b></p>
                            <p>{{ formatDateTime(row.publication.start, "MM/DD/YYYY hh:mm A") + " - " + formatDateTime(row.publication.end, "MM/DD/YYYY hh:mm A")  }}</p>
                        </div>
                    </div>
                    {% endfor %}
                    {% else %}
                    <h1>No items...</h1>
                    {% endif %}
                </div>
            </div>
        </div>
    </div>
{% endblock %}

{% block page_js %}
<script>
    {% include "pages.js" %}
</script>
{% endblock %}
