---
title: People
name: people
layout: default
permalink: /people/
description: 
---

{% include layouts/title.md %}

<h2 class="people-section-title">Organization</h2>

{% include people/orgchart.html %}

<h2 class="people-section-title" id="everyone">Everyone</h2>

{% assign roster = site.people | where_exp: "p", "p.active != false" | sort_natural: "shortname" %}
<div class="people-grid">
  {%- for p in roster -%}
    {% include people/card.html person=p %}
  {%- endfor -%}
</div>
