{% extends 'app/views/front/layout.swig' %}

{% block section %}
    
    <h2>{{ category.name }}</h2>

    {% for page in pages %}
        {% include "_pages.swig" with page %}
    {% endfor %}

{% endblock %}
