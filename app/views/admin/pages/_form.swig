<div class="tab-content">
    <!-- Basics attributes -->
    <div role="tabpanel" class="tab-pane active" id="tab-basics">
        <div class="panel panel-default">
            <div class="panel-body nopadding">
                <div class="form-group">
                    <label class="col-sm-4 control-label" for="title">Title</label>
                    <div class="col-sm-8">
                        <input type="text"
                               placeholder="Title"
                               name="title"
                               id="title"
                               class="form-control"
                               value="{{ item.title }}"
                               required/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label" for="slug">Slug</label>
                    <div class="col-sm-8">
                        <input type="text"
                               placeholder="Slug"
                               name="slug"
                               id="slug"
                               class="form-control"
                               value="{{ item.slug }}"
                               required/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label" for="slug">Status</label>
                    <div class="col-sm-8">
                        <select class="form-control" name="publication[status]">
                            <option value="draft" {% if item.publication.status === "draft" %}selected{% endif %}>Draft</option>
                            <option value="pending" {% if item.publication.status === "pending" %}selected{% endif %}>Pending Review</option>
                            <option value="published" {% if item.publication.status === "published" %}selected{% endif %}>Published</option>
                            <option value="unpublished" {% if item.publication.status === "unpublished" %}selected{% endif %}>Unpublished</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label" for="datepicker_start">Start</label>
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
                    <label class="col-sm-4 control-label" for="datepicker_start">Finish</label>
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
                    <label class="col-sm-4 control-label" for="content">Content</label>
                    <div class="col-sm-8">
                        <textarea id="content" name="content">{{ item.content }}</textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Basics attributes -->
    <div role="tabpanel" class="tab-pane" id="tab-categories">
        <div class="panel panel-default">
            <div class="panel-body nopadding">
                <div class="form-group">
                    <label class="col-sm-4 control-label" for="content">Categories</label>
                    <div class="col-sm-8">
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
            </div>
        </div>
    </div>
</div>
