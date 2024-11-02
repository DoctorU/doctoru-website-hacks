---
title: Blog
subtitle: 
layout: blog
override:tags: []
---
This is where I jot random thoughts about technology, coding, and what's top-of-mind.

Apropos nothing: The icon: it's a 'blog roll', ok?!

## Blog List

{% for b in collections.blog reversed %}
1. [{{b.data.title}}]({{b.url}}) ({{b.date | iso_date}})
{% endfor %}