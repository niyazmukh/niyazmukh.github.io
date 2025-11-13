---
layout: base
title: im niyaz
---

<main>
  <section id="about">
    <p>
      based in israel. currently pursuing a phd at the technion, researching human–ai interaction and
      augmented decision‑making while building decision‑prediction models.
    </p>
    <p>
      working as a product manager at a saas startup.
    </p>
    <p>
      previous experience spans data analytics, project management (from software to construction),
      process re‑engineering, and human resources. mba from the rochester institute of technology; earlier
      studies in linguistics. "extracurricular" studies includes cybersecurity, data analytics, and machine learning.
    </p>
    <p>
      love my wife, raise two brilliant daughters (both are in kitot mehunanim and swimming with maccabi haifa).
    </p>
    <p>
      curious and growth‑oriented, with an emphasis on cognitive flexibility. hit me up to talk.
    </p>
  </section>
</main>

<section id="blog" hidden>
  <h2>blog</h2>
  {% if site.posts and site.posts.size > 0 %}
  <ul>
    {% for post in site.posts %}
    {% assign slug = post.id | slugify %}
    <li>
      <a class="post-link" href="{{ post.url | relative_url }}" data-post-template="post-template-{{ slug }}">{{ post.title | escape }}</a>
      <small>— {{ post.date | date: "%b %d, %Y" }}</small>
      {% if post.excerpt %}<div class="excerpt">{{ post.excerpt | strip_html | truncate: 140 }}</div>{% endif %}
      <template id="post-template-{{ slug }}" data-post-template>
        <article>
          <header>
            <h2>{{ post.title | escape }}</h2>
            <div class="modal-meta">posted {{ post.date | date: "%B %e, %Y" }}</div>
          </header>
          {{ post.content }}
        </article>
      </template>
    </li>
    {% endfor %}
  </ul>
  {% else %}
  <p><em>no posts yet — coming soon.</em></p>
  {% endif %}
</section>

<section id="projects" hidden>
  <h2>projects</h2>
  <p>a small selection of experiments and tools. details and links will be added here.</p>
  <ul>
    <li>decision‑prediction models — research code & notes (coming)</li>
    <li>product analytics toolkit — utilities and dashboards (coming)</li>
    <li>small scripts & utilities — assorted helpers (coming)</li>
  </ul>
</section>
