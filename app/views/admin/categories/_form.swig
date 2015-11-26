<div class="tab-content">
    <!-- Basics attributes -->
    <div role="tabpanel" class="tab-pane active" id="tab-basics">
        <div class="panel panel-default">
            <div class="panel-body nopadding">
                <div class="form-group">
                    <label class="col-sm-4 control-label" for="name">Name</label>
                    <div class="col-sm-8">
                        <input type="text"
                               placeholder=""
                               name="name"
                               id="name"
                               class="form-control"
                               value="{{ item.name }}"
                               required/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label" for="slug">Slug</label>
                    <div class="col-sm-8">
                        <div class="input-group">
                            <input type="text"
                                   placeholder="Slug"
                                   name="slug"
                                   id="slug"
                                   class="form-control"
                                   value="{{ item.slug }}"
                                   required/>
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-default refresh-slug"><i
                                            class="fa fa-refresh"></i></button>
                                </span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label" for="parent">Parent category</label>
                    <div class="col-sm-8">
                        <select class="width100p" data-placeholder="Parent category" name="parent">
                            <option></option>
                            {% for category in categories %}
                            <option value="{{ category.id }}"
                                    {% if item.parent == category.id %}selected{% endif %}>{{ category.name }}</option>
                            {% endfor %}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>