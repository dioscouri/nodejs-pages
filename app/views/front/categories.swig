{% extends 'app/views/front/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block section %}

Categories index page

{% macro drawCheckbox(category) %}
    <h3><a href="/pages/categories/{{ category.slug }}">{{ category.name }}</a></h3>
    {% if category.children %}
    <ul>
        {% for child in category.children %}
        <li>
            {{ drawCheckbox(child) }}
        </li>
        {% endfor %}
    </ul>
    {% endif %}
{% endmacro %}
<ul>
    {% for category in categories %}
    <li>
        {{ drawCheckbox(category) }}
    </li>
    {% endfor %}
</ul>

{% endblock %}
