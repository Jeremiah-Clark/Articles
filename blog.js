// blog.js — loads markdown posts from a GitHub folder with permalinks and truncation
(function () {
  var GH_USER   = "Jeremiah-Clark";
  var GH_REPO   = "Blog";
  var GH_BRANCH = "main";
  var POSTS_DIR = "blog";
  var EXCERPT_BLOCKS = 3; // number of content blocks to show in list view

  // Base URL where relative image/asset paths are resolved against.
  // Posts live in /blog, so a path like ../images/foo.png from a post
  // resolves to https://.../Articles@main/images/foo.png
  var ASSET_BASE = "https://cdn.jsdelivr.net/gh/" + GH_USER + "/" + GH_REPO + "@" + GH_BRANCH + "/" + POSTS_DIR + "/";

  var statusEl    = document.getElementById("blog-status");
  var containerEl = document.getElementById("blog-container");

  if (!statusEl || !containerEl) {
    console.error("[blog] missing #blog-status or #blog-container in DOM");
    return;
  }

  var postsBySlug = {};
  var originalTitle = document.title;

  // ---------- utilities ----------

  function showError(msg) {
    console.error("[blog]", msg);
    statusEl.style.display = "block";
    statusEl.style.color = "#b00";
    statusEl.textContent = msg;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }

  function slugify(s) {
    return String(s).toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
  }

  function formatDate(iso) {
    var d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleDateString(undefined,
      { year: "numeric", month: "long", day: "numeric" });
  }

  function makePermalink(slug) {
    return "?post=" + encodeURIComponent(slug) + "#blog";
  }

  // Resolve a relative URL against the post's base location in the repo.
  // Absolute URLs (http://, https://, //, data:) are passed through unchanged.
  // Anchor links (#foo) and absolute repo paths (/foo) are also passed through.
  function resolveAssetUrl(url) {
    if (!url) return url;
    if (/^([a-z]+:)?\/\//i.test(url)) return url; // http://, https://, //
    if (/^(data|mailto|tel):/i.test(url)) return url;
    if (url.charAt(0) === '#') return url;
    if (url.charAt(0) === '/') return url;
    try {
      return new URL(url, ASSET_BASE).href;
    } catch (e) {
      return url;
    }
  }

  // ---------- markdown rendering ----------

  function renderInline(text) {
    text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g,
      function (_, alt, url) {
        return '<img src="' + escapeHtml(resolveAssetUrl(url)) + '" alt="' + escapeHtml(alt) + '" loading="lazy">';
      });
    text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,
      function (_, t, url) {
        return '<a href="' + escapeHtml(resolveAssetUrl(url)) + '" target="_blank" rel="noopener noreferrer">' + t + '</a>';
      });
    text = text.replace(/`([^`]+)`/g, function (_, code) {
      return '<code>' + escapeHtml(code) + '</code>';
    });
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
    return text;
  }

  function mdToHtml(md) {
    var lines = md.replace(/\r\n/g, "\n").split("\n");
    var out = [], i = 0;
    while (i < lines.length) {
      var line = lines[i];
      if (/^```/.test(line)) {
        var code = []; i++;
        while (i < lines.length && !/^```/.test(lines[i])) { code.push(lines[i]); i++; }
        i++;
        out.push('<pre><code>' + escapeHtml(code.join("\n")) + '</code></pre>');
        continue;
      }
      if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) { out.push('<hr>'); i++; continue; }
      var h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        out.push('<h' + h[1].length + '>' + renderInline(escapeHtml(h[2])) + '</h' + h[1].length + '>');
        i++; continue;
      }
      if (/^>\s?/.test(line)) {
        var bq = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) {
          bq.push(lines[i].replace(/^>\s?/, "")); i++;
        }
        out.push('<blockquote>' + renderInline(escapeHtml(bq.join(" "))) + '</blockquote>');
        continue;
      }
      if (/^\s*[-*+]\s+/.test(line)) {
        var items = [];
        while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*[-*+]\s+/, "")); i++;
        }
        out.push('<ul>' + items.map(function (x) {
          return '<li>' + renderInline(escapeHtml(x)) + '</li>';
        }).join("") + '</ul>');
        continue;
      }
      if (/^\s*\d+\.\s+/.test(line)) {
        var oitems = [];
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
          oitems.push(lines[i].replace(/^\s*\d+\.\s+/, "")); i++;
        }
        out.push('<ol>' + oitems.map(function (x) {
          return '<li>' + renderInline(escapeHtml(x)) + '</li>';
        }).join("") + '</ol>');
        continue;
      }
      if (/^\s*$/.test(line)) { i++; continue; }
      var para = [];
      while (i < lines.length &&
             !/^\s*$/.test(lines[i]) &&
             !/^#{1,6}\s+/.test(lines[i]) &&
             !/^```/.test(lines[i]) &&
             !/^>\s?/.test(lines[i]) &&
             !/^\s*[-*+]\s+/.test(lines[i]) &&
             !/^\s*\d+\.\s+/.test(lines[i])) {
        para.push(lines[i]); i++;
      }
      out.push('<p>' + renderInline(escapeHtml(para.join(" "))) + '</p>');
    }
    return out.join("\n");
  }

  // ---------- post parsing ----------

  function parsePost(filename, text) {
    var title = filename.replace(/\.md$/i, "");
    var date  = "";
    var slug  = "";
    var body  = text;

    var fm = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    if (fm) {
      body = fm[2];
      var t = fm[1].match(/^title:\s*(.+)$/m);
      var d = fm[1].match(/^date:\s*(.+)$/m);
      var s = fm[1].match(/^slug:\s*(.+)$/m);
      if (t) title = t[1].trim().replace(/^["']|["']$/g, "");
      if (d) date  = d[1].trim().replace(/^["']|["']$/g, "");
      if (s) slug  = s[1].trim().replace(/^["']|["']$/g, "");
    } else {
      var h1 = body.match(/^#\s+(.+)$/m);
      if (h1) { title = h1[1].trim(); body = body.replace(/^#\s+.+\n?/, ""); }
    }
    if (!date) {
      var m = filename.match(/^(\d{4})-?(\d{2})-?(\d{2})/);
      if (m) date = m[1] + "-" + m[2] + "-" + m[3];
    }
    if (!slug) {
      var base = filename.replace(/\.md$/i, "").replace(/^\d{4}-?\d{2}-?\d{2}\s*/, "");
      slug = slugify(base);
    } else {
      slug = slugify(slug);
    }
    return { title: title, date: date, slug: slug, body: body };
  }

  // ---------- excerpt truncation ----------

  function truncateHtml(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    var children = Array.prototype.slice.call(tmp.children);
    if (children.length === 0) return { excerpt: html, truncated: false };

    var countedTags = { P:1, UL:1, OL:1, BLOCKQUOTE:1, PRE:1 };
    var blockCount = 0;
    var cutoff = children.length;

    for (var i = 0; i < children.length; i++) {
      if (countedTags[children[i].tagName]) blockCount++;
      if (blockCount >= EXCERPT_BLOCKS) {
        cutoff = i + 1;
        break;
      }
    }
    if (cutoff >= children.length) {
      return { excerpt: html, truncated: false };
    }
    var out = document.createElement('div');
    for (var j = 0; j < cutoff; j++) {
      out.appendChild(children[j].cloneNode(true));
    }
    return { excerpt: out.innerHTML, truncated: true };
  }

  // ---------- DOM assembly ----------

  function renderPost(parsed) {
    var fullHtml = mdToHtml(parsed.body);
    var truncation = truncateHtml(fullHtml);
    var permalink = makePermalink(parsed.slug);

    var el = document.createElement("article");
    el.className = "blog-post";
    el.setAttribute("data-slug", parsed.slug);
    el.innerHTML =
      '<h2 class="blog-title">' +
        '<a href="' + permalink + '" data-permalink class="blog-title-link">' +
          escapeHtml(parsed.title) +
        '</a>' +
      '</h2>' +
      (parsed.date ? '<p class="blog-date">' + escapeHtml(formatDate(parsed.date)) + '</p>' : '') +
      '<div class="blog-body">' + fullHtml + '</div>' +
      '<div class="blog-excerpt">' + truncation.excerpt +
        (truncation.truncated
          ? '<p class="blog-readmore-wrap">' +
              '<a href="' + permalink + '" data-permalink class="blog-readmore">Read more →</a>' +
            '</p>'
          : '') +
      '</div>';
    return el;
  }

  function makeBackLink() {
    var a = document.createElement('a');
    a.className = 'blog-back';
    a.href = '#blog';
    a.setAttribute('data-blog-back', '');
    a.textContent = '← All posts';
    return a;
  }

  // ---------- view state management ----------

  function updateView() {
    var params = new URLSearchParams(location.search);
    var slug = params.get('post');

    if (slug && postsBySlug[slug]) {
      containerEl.classList.remove('mode-list');
      containerEl.classList.add('mode-single');
      var posts = containerEl.querySelectorAll('.blog-post');
      for (var i = 0; i < posts.length; i++) {
        if (posts[i].getAttribute('data-slug') === slug) {
          posts[i].classList.add('this-post');
        } else {
          posts[i].classList.remove('this-post');
        }
      }
      document.title = postsBySlug[slug].title + ' — ' + originalTitle;
    } else {
      if (slug) {
        console.warn('[blog] unknown slug:', slug);
        history.replaceState(null, '', location.pathname + '#blog');
      }
      containerEl.classList.remove('mode-single');
      containerEl.classList.add('mode-list');
      var allPosts = containerEl.querySelectorAll('.blog-post');
      for (var j = 0; j < allPosts.length; j++) {
        allPosts[j].classList.remove('this-post');
      }
      document.title = originalTitle;
    }
  }

  function scrollToCurrent() {
    var params = new URLSearchParams(location.search);
    var slug = params.get('post');
    var target = null;
    if (slug) target = containerEl.querySelector('.blog-post[data-slug="' + slug + '"]');
    if (!target) target = containerEl;
    if (target.scrollIntoView) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleContainerClick(e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    var permalink = e.target.closest ? e.target.closest('a[data-permalink]') : null;
    if (permalink) {
      e.preventDefault();
      history.pushState(null, '', permalink.getAttribute('href'));
      updateView();
      scrollToCurrent();
      return;
    }
    var back = e.target.closest ? e.target.closest('a[data-blog-back]') : null;
    if (back) {
      e.preventDefault();
      history.pushState(null, '', location.pathname + '#blog');
      updateView();
      scrollToCurrent();
      return;
    }
  }

  // ---------- load posts and initialize ----------

  var apiUrl = "https://api.github.com/repos/" + GH_USER + "/" + GH_REPO +
               "/contents/" + POSTS_DIR + "?ref=" + GH_BRANCH;

  fetch(apiUrl).then(function (r) {
    if (!r.ok) throw new Error("GitHub API " + r.status);
    return r.json();
  }).then(function (files) {
    var mdFiles = files.filter(function (f) {
      return f.name.toLowerCase().endsWith(".md");
    }).sort(function (a, b) { return b.name.localeCompare(a.name); });

    if (mdFiles.length === 0) { statusEl.textContent = "No posts yet."; return; }

    return Promise.all(mdFiles.map(function (f) {
      return fetch(f.download_url).then(function (r) { return r.text(); })
        .then(function (text) { return { name: f.name, text: text }; });
    }));
  }).then(function (posts) {
    if (!posts) return;

    statusEl.style.display = "none";
    containerEl.appendChild(makeBackLink());

    posts.forEach(function (p) {
      try {
        var parsed = parsePost(p.name, p.text);
        if (!parsed.slug) parsed.slug = 'post-' + Math.random().toString(36).slice(2, 8);
        if (postsBySlug[parsed.slug]) {
          console.warn('[blog] duplicate slug:', parsed.slug, 'for', p.name);
        }
        postsBySlug[parsed.slug] = parsed;
        containerEl.appendChild(renderPost(parsed));
      } catch (e) {
        console.error("[blog] render failed for", p.name, e);
      }
    });

    containerEl.addEventListener('click', handleContainerClick);
    window.addEventListener('popstate', updateView);

    updateView();
  }).catch(function (err) {
    showError("Couldn't load posts: " + err.message);
  });
})();
