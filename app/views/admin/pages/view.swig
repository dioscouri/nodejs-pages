{% extends 'app/views/admin/layout.swig' %}

{% block title %}{{ header }}{% endblock %}

{% block pageheader %}
    {% include "app/views/admin/partials/pageheader.swig" with {
        'pageTitle': 'Company Details',
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
            <li role="presentation">
                <a href="#tab-categories" aria-controls="tab-categories" role="tab" data-toggle="tab">Categories</a>
            </li>
        </ul>
    </div>
    <div class="col-sm-9 col-md-9 col-lg-10">
        <div class="tab-content">
            <!-- Basics attributes -->
            <div role="tabpanel" class="tab-pane active" id="tab-basics">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h1>{{ item.title }}</h1>
                        <p>url: <a href="/{{ item.slug }}">{{ item.slug }}</a></p>
                        <br>
                        {% autoescape false %}{{ item.content }}{% endautoescape %}
                    </div>
                </div>
            </div>

            <!-- Basics attributes -->
            <div role="tabpanel" class="tab-pane" id="tab-categories">
                <div class="panel panel-default">
                    <div class="panel-body">
                        {% macro drawCheckbox(category) %}
                        <input type="checkbox"
                               name="categories[]"
                               id="category_{{ category._id.toString() }}"
                               value="{{ category._id.toString() }}"
                               disabled readonly
                               {% if selectedCategories[category._id.toString()] %}checked{% endif %}>
                        <label for="category_{{ category._id.toString() }}">{{ category.name }}</label>
                        {% if category.children %}
                        <ul>
                            {% for child1 in category.children %}
                            <li>
                                {{ drawCheckbox(child1) }}
                            </li>
                            {% endfor %}
                        </ul>
                        {% endif %}
                        {% endmacro %}
                        {% for category in categories %}
                        <li>
                            {{ drawCheckbox(category) }}
                        </li>
                        {% endfor %}
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
{% endblock %}
