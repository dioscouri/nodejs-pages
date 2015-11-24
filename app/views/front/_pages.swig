<article id="page-{{page.slug}}" class="pages-page page-{{page.slug}}">
    <div class="entry-header">
        <h3 class="entry-title">
            <a href="/pages/{{ page.slug }}">
                {{ page.title }}
            </a>
        </h3>
        
        {#
        {% if (page.featured_image) { %}
        <a href="/pages/{{ page.slug }}">
            <img class="entry-featured img-responsive" width="100%" src="{{page.featured_image.thumbnail}}">
        </a>
        {% } %}
        #}
    
    </div>    
</article>