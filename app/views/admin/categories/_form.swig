<form action="{{ actionUrl }}" method="post" class="form-horizontal form-bordered">
    <div class="form-group">
        <label class="col-sm-2 control-label">Title</label>
        <div class="col-sm-10">
            <input type="text"
                   placeholder="Name"
                   name="name"
                   class="form-control"
                   value="{{ item.name }}"
                   required/>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">Slug</label>
        <div class="col-sm-10">
            <input type="text"
                   placeholder="Slug"
                   name="slug"
                   class="form-control"
                   value="{{ item.slug }}"
                   required/>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label">Parent</label>
        <div class="col-sm-10">
            <select class="width100p" data-placeholder="Parent category" name="parent">
                <option></option>
                {% for category in categories %}
                <option value="{{ category.id }}"
                        {% if item.parent == category.id %}selected{% endif %}>{{ category.name }}</option>
                {% endfor %}
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label"></label>

        <div class="col-sm-10">
            <button type="submit" class="btn btn-success">Save</button>
            <a href="{{appUrl}}" class="btn btn-default">Cancel</a>
        </div>
    </div>
</form>