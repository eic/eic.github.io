{% case include.what %}

{% when "software" %}    {% assign theCollection=site.software %}    {% assign icon=site.software_icon %}
{% when "resources" %}   {% assign theCollection=site.resources %}   {% assign icon=site.resources_icon %}
{% when "activities" %}  {% assign theCollection=site.activities %}  {% assign icon=site.activities_icon %}
{% when "organization" %}{% assign theCollection=site.organization %}{% assign icon=site.organization_icon %}
{% when "policies" %}    {% assign theCollection=site.policies %}    {% assign icon=site.policies_icon %}
{% when "documentation" %}{% assign theCollection=site.documentation %}{% assign icon=site.documentation_icon %}
{% when "about" %}       {% assign theCollection=site.about %}            {% assign icon=site.about_icon %}
{% when "tutorials" %}   {% assign icon=site.documentation_icon %}

{% endcase %}

{% assign the_menu = site.data.menus | where: "name", include.what | first %}
{% assign dropdown_id = include.what | slugify | prepend: 'navbar-dropdown-' %}

{% if the_menu.path %}
<li class="nav-item px-2">
{% if icon.size > 0 %}
<a class="nav-link" href="{{ the_menu.path | relative_url }}" style="color: #fff;">{{ the_menu.full }}&nbsp;&nbsp;<img src="{{ icon | relative_url }}" height="16" width="16"></a>
{% else %}
<a class="nav-link" href="{{ the_menu.path | relative_url }}" style="color: #fff;">{{ the_menu.full }}</a>
{% endif %}
</li>
{% else %}
<li class="nav-item dropdown px-2">
{% if icon.size > 0 %}
<a class="nav-link dropdown-toggle" href="#" id="{{ dropdown_id }}" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: #fff;">{{ the_menu.full }}&nbsp;&nbsp;<img src="{{ icon | relative_url }}" height="16" width="16"></a>
{% else %}
<a class="nav-link dropdown-toggle" href="#" id="{{ dropdown_id }}" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: #fff;">{{ the_menu.full }}</a>
{% endif %}

<div class="dropdown-menu{% if the_menu.right %} dropdown-menu-end{% endif %}" aria-labelledby="{{ dropdown_id }}">

{% for submenu in the_menu.submenus %}
{% if submenu.exclude %}{% continue %}{% endif %}

{% if submenu.div %}<div class="dropdown-divider"></div>{% endif %}

{% if submenu.label %}<div class="dropdown-item site-nav-section-label">{{ submenu.full }}</div>{% continue %}{% endif %}


{% if submenu.link %}
{% assign theLink=submenu.link %}
<a class="dropdown-item" href="{{ theLink }}" {{ site.blank }}>{{ submenu.full }}&nbsp;<img src="{{ site.external_icon | relative_url }}" height="12" width="12"></a>
{% elsif submenu.path %}
{% assign theLink=submenu.path | relative_url %}
<a class="dropdown-item" href="{{ theLink }}">{{ submenu.full }}</a>
{% elsif submenu.collection %}
{% case submenu.collection %}
{% when "software" %}    {% assign submenu_collection=site.software %}
{% when "resources" %}   {% assign submenu_collection=site.resources %}
{% when "activities" %}  {% assign submenu_collection=site.activities %}
{% when "organization" %}{% assign submenu_collection=site.organization %}
{% when "policies" %}    {% assign submenu_collection=site.policies %}
{% when "documentation" %}{% assign submenu_collection=site.documentation %}
{% when "about" %}       {% assign submenu_collection=site.about %}
{% endcase %}
{% assign item=submenu_collection | where: "name", submenu.name | first %}
{% assign theLink=item.url | relative_url %}
<a class="dropdown-item" href="{{ theLink }}">{{ submenu.full }}</a>
{% else %}

{% assign item=theCollection | where: "name", submenu.name | first %}
{% assign theLink=item.url | relative_url %}

{% assign experiment=theCollection | where: "name", submenu.name | map: "url" | first | relative_url %}
<a class="dropdown-item" href="{{ theLink }}">{{ submenu.full }}</a>

{% endif %}

{% endfor %}

</div>
</li>
{% endif %}
