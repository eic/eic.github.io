---
title: People
name: people
layout: default
permalink: /people/
description: 
---

{% include layouts/title.md %}

{% include people/toplinks.html here='all' %}

{% assign roster = site.people | where_exp: "p", "p.active != false" | sort_natural: "shortname" %}
<div class="people-grid">
  {%- for p in roster -%}
    {% include people/card.html person=p %}
  {%- endfor -%}
</div>
