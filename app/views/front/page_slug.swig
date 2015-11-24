{% extends 'app/views/front/layout.swig' %}

{% block section %}

<article id="page-{{page.slug}}" class="pages-page page-{{page.slug}}">
    <h2>{{ page.title }}</h2>
    
    {% autoescape false %}{{ page.content }}{% endautoescape %}
</article>

{% endblock %}
