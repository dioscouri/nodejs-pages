<form action="{{ actionUrl }}" method="post" class="form-horizontal form-bordered">
    <div class="form-group">
        <label class="col-sm-2 control-label">Title</label>
        <div class="col-sm-10">
            <input type="text"
                   placeholder="Title"
                   name="title"
                   class="form-control"
                   value="{{ item.title }}"
                   required/>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">Slug</label>
        <div class="col-sm-10">
            <input type="text"
                   placeholder="slug"
                   name="slug"
                   class="form-control"
                   value="{{ item.slug }}"
                   required/>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">Status</label>
        <div class="col-sm-10">
            <select class="form-control" name="publication[status]" class="form-control">
                <option value="draft" {% if item.publication.status === "draft" %}selected{% endif %}>Draft</option>
                <option value="pending" {% if item.publication.status === "pending" %}selected{% endif %}>Pending Review</option>
                <option value="published" {% if item.publication.status === "published" %}selected{% endif %}>Published</option>
                <option value="unpublished" {% if item.publication.status === "unpublished" %}selected{% endif %}>Unpublished</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label" for="datepicker_start">Start</label>
        <div class="col-sm-3">
            <div class="input-group">
                <input type="text"
                       class="form-control"
                       placeholder="mm/dd/yyyy"
                       name="publication[start_date]"
                       value="{{ startDate }}"
                       id="datepicker_start">
                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="input-group">
                <div class="bootstrap-timepicker">
                    <input id="timepicker_start"
                           name="publication[start_time]"
                           type="text"
                           class="form-control"
                           value="{{ startTime }}"/>
                </div>
                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
            </div>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label" for="datepicker_end">Finish</label>
        <div class="col-sm-3">
            <div class="input-group">
                <input type="text"
                       class="form-control"
                       placeholder="mm/dd/yyyy"
                       name="publication[end_date]"
                       value="{{ endDate }}"
                       id="datepicker_end">
                <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
            </div>
        </div>
        <div class="col-sm-3">
            <div class="input-group">
                <div class="bootstrap-timepicker">
                    <input id="timepicker_end"
                           name="publication[end_time]"
                           type="text"
                           class="form-control"
                           value="{{ endTime }}"/>
                </div>
                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
            </div>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">Content</label>
        <div class="col-sm-10">
            <textarea id="content" name="content">{{ item.content }}</textarea>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">Categories</label>
        <div class="col-sm-10">
            {% macro drawCheckbox(category) %}
                <input type="checkbox"
                       name="categories[]"
                       id="category_{{ category._id.toString() }}"
                       value="{{ category._id.toString() }}"
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
    <div class="form-group">
        <label class="col-sm-2 control-label"></label>

        <div class="col-sm-10">
            <button type="submit" class="btn btn-success">Save</button>
            <a href="{{appUrl}}" class="btn btn-default">Cancel</a>
            {% if item.slug %}
            <a href="/pages/{{ item.slug }}" target="_blank" class="btn btn-info pull-right">Preview</a>
            {% endif %}
        </div>
    </div>
</form>