<li class="nav-item dropdown px-4">
{% assign dropdown_id = include.title | slugify | prepend: 'navbar-dropdown-' %}
<a class="nav-link dropdown-toggle" href="#" id="{{ dropdown_id }}" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: #fff;">{{ include.title }}</a>
<div class="dropdown-menu" aria-labelledby="{{ dropdown_id }}">

{% assign items = include.what | sort: 'weight' %}

{% for item in items %}
{% if item.level != 0  %}{% continue %}{% endif %}
{% if item.div %}<div class="dropdown-divider"></div>{% endif %}

{% if item.link %}
{% assign theLink=item.link %}
{% assign target=site.blank %}
{% else %}
{% assign theLink=item.url | relative_url %}
{% assign target='' %}
{% endif %}

<a class="dropdown-item" href="{{ theLink }}" {{ target }}>{{ item.title }}</a>
{% endfor %}
</div>
</li>
