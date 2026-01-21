---
layout: base
title: im niyaz
---

<main>
  <section id="about" role="tabpanel" aria-labelledby="tab-about">
    <p>
      based in israel. currently a phd researcher in human–ai interaction and
      augmented decision‑making, building decision‑prediction models.
    </p>
    <p>
      working as a product manager at a saas startup.
    </p>
    <p>
      previous experience spans data analytics, project management (from software to construction),
      process re‑engineering, and human resources. mba from the rochester institute of technology; earlier, an ma in linguistics. "extracurricular" studies include cybersecurity and machine learning.
    </p>
    <p>
      i love my wife and am raising two brilliant daughters.
    </p>
    <p>
      curious and growth‑oriented, with an emphasis on cognitive flexibility. reach out if you want to talk.
    </p>
  </section>
</main>

<section id="blog" role="tabpanel" aria-labelledby="tab-blog" hidden>
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

<section id="projects" role="tabpanel" aria-labelledby="tab-projects" hidden>
  <h2>projects</h2>
  <p>a small selection of experiments and tools.</p>
  <ul>
    <li>
      <strong>Shrink Ray Model</strong> — interactive tutorial + monte carlo explorer for shrinkflation strategies.
      <a href="https://niyaz.me/shrink20/" target="_blank" rel="noopener">launch</a>
    </li>
    <li>
      <strong>Minutes</strong> — built for university of haifa research. explores behavioral nudges and incentives for digital wellbeing.
      <a href="https://play.google.com/store/apps/details?id=com.niyaz.zario" target="_blank" rel="noopener">play store</a>
      | 
      <a href="https://github.com/niyazmukh/zario2" target="_blank" rel="noopener">source</a>
    </li>
    <li>decision‑prediction models — research code & notes (coming)</li>
    <li>product analytics toolkit — utilities and dashboards (coming)</li>
    <li>small scripts & utilities — assorted helpers (coming)</li>
  </ul>
</section>
