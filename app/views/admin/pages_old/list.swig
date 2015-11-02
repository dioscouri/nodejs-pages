{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "app/views/admin/partials/pageheader.swig" with { 'pageTitle': 'Pages Management'} %}
{% endblock %}

{% block pagecontent %}

<div class="row">
    <div class="col-xs-6">

    </div>
    <div class="col-xs-6">
        <a href="{{ createUrl }}" class="btn btn-success pull-right">Create New</a>
    </div>
</div>
<br>
<table class="table table-striped table-bordered">
    <thead>
    <tr>
        <td>Title</td>
        <td>Slug</td>
        <td style="width: 100px">Status</td>
        <td style="width: 300px">Start - Finish</td>
        <td style="width: 185px;"></td>
    </tr>
    </thead>
    <tbody>
    {% if items.length > 0 %}
    {% for row in items %}
    {% set id = row.id %}
    {% set editUrl = baseUrl + '/' + row.id + '/edit' %}
    {% set deleteUrl = baseUrl + '/' + row.id + '/delete' %}
    <tr>
        <td>{{ row.title }}</td>
        <td>{{ row.slug }}</td>
        <td>{{ row.publication.status }}</td>
        <td>{{ formatDateTime(row.publication.start, "MM/DD/YYYY hh:mm A") + " - " + formatDateTime(row.publication.end, "MM/DD/YYYY hh:mm A")  }}</td>
        <td>
            <a href="{{ editUrl }}" class="btn btn-primary btn-xs">Edit</a>
            <a href="javascript:void(0)" class="btn btn-danger btn-xs"
               onclick="if (confirm('Are you sure you want to delete this record?')) {document.location.href = '{{ deleteUrl }}';}">Delete</a>
            <a href="/pages/{{ row.slug }}" target="_blank" class="btn btn-info btn-xs">Preview</a>
        </td>
    </tr>
    {% endfor %}
    {% else %}
    <tr>
        <td colspan="6"><h3 class="text-muted">There are no pages yet.</h3></td>
    </tr>
    {% endif %}
    </tbody>
</table>
{% endblock %}
