{% extends 'app/views/front/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block section %}

<h1>All pages in category</h1>
<ul>
    {% for page in pages %}
    <li>
        <h3><a href="/pages/{{ page.slug }}">{{ page.title }}</a></h3>
    </li>
    {% endfor %}
</ul>

{% endblock %}
