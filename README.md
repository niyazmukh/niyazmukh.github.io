## niyaz.me site

personal site + blog powered by github pages (jekyll) with a single-page tab interface.

### posting a new blog entry

1. add a markdown file under `_posts/` named `YYYY-MM-DD-your-title.md`.
2. include front matter at the top:
   ```yaml
   ---
   layout: post
   title: "your title"
   summary: "optional short summary"
   ---
   ```
3. write content below the front matter in markdown. keep it concise; first paragraph becomes the excerpt.
4. commit and push to `main`. github pages rebuilds automatically (usually within 1–2 minutes).

the post will appear in the blog tab list once the build finishes. permalink format: `/blog/YYYY/MM/DD/slug/`.

### local preview (optional)

if you want to preview locally:
```
gem install bundler jekyll   # first time only
bundle init                  # if Gemfile missing
bundle add jekyll            # add jekyll
bundle exec jekyll serve     # serve at http://127.0.0.1:4000
```

### custom domain dns

apex `niyaz.me` -> A records pointing to:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
`www` -> CNAME `niyazmukh.github.io`.

### structure

- `index.html` main page with tabs (about / blog / projects) and liquid loop for posts.
- `_posts/` jekyll posts.
- `_config.yml` site configuration.
- `src/` typescript source; compiled js in `dist/`.

### notes

- accessibility: tabs use `aria-selected` and keyboard arrow navigation.
- minimal css; system font stack; dark/light adaptation via `color-scheme`.
- feel free to extend with rss, analytics, or pagination later.

### license

content © niyaz. code may be reused with attribution.
# niyazmukh.github.io