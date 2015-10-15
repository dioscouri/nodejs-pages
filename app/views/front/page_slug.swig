{% extends 'app/views/front/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block section %}

{% autoescape false %}{{ pageContent }}{% endautoescape %}

{% endblock %}
