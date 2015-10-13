<script src="//cdn.ckeditor.com/4.5.4/standard/ckeditor.js"></script>

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
        <label class="col-sm-2 control-label">Content</label>
        <div class="col-sm-10">
            <textarea name="content">{{ item.content }}</textarea>
            <script>
                CKEDITOR.replace('content');
            </script>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2 control-label"></label>

        <div class="col-sm-10">
            <button type="submit" class="btn btn-success">Save</button>
            <button type="button" class="btn btn-default">Cancel</button>
        </div>
    </div>
</form>