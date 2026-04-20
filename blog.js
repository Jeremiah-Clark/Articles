// blog.js — loads markdown posts from a GitHub folder and renders them
(function () {
  console.log("[blog] script loaded");

  var GH_USER   = "Jeremiah-Clark";
  var GH_REPO   = "Articles";
  var GH_BRANCH = "main";
  var POSTS_DIR = "blog";

  var statusEl    = document.getElementById("blog-status");
  var containerEl = document.getElementById("blog-container");

  if (!statusEl || !containerEl) {
    console.error("[blog] missing #blog-status or #blog-container in DOM");
    return;
  }

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

  function renderInline(text) {
    text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g,
      function (_, alt, url) { return '<img src="' + url + '" alt="' + escapeHtml(alt) + '">'; });
    text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,
      function (_, t, url) {
        return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + t + '</a>';
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

  function parsePost(filename, text) {
    var title = filename.replace(/\.md$/i, "");
    var date  = "";
    var body  = text;

    var fm = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    if (fm) {
      body = fm[2];
      var t = fm[1].match(/^title:\s*(.+)$/m);
      var d = fm[1].match(/^date:\s*(.+)$/m);
      if (t) title = t[1].trim().replace(/^["']|["']$/g, "");
      if (d) date  = d[1].trim().replace(/^["']|["']$/g, "");
    } else {
      var h1 = body.match(/^#\s+(.+)$/m);
      if (h1) { title = h1[1].trim(); body = body.replace(/^#\s+.+\n?/, ""); }
    }
    if (!date) {
      var m = filename.match(/^(\d{4})-?(\d{2})-?(\d{2})/);
      if (m) date = m[1] + "-" + m[2] + "-" + m[3];
    }
    return { title: title, date: date, body: body };
  }

  function formatDate(iso) {
    var d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleDateString(undefined,
      { year: "numeric", month: "long", day: "numeric" });
  }

  function renderPost(p) {
    var parsed = parsePost(p.name, p.text);
    var el = document.createElement("article");
    el.className = "blog-post";
    el.innerHTML =
      '<h2 class="blog-title">' + escapeHtml(parsed.title) + '</h2>' +
      (parsed.date ? '<p class="blog-date">' + escapeHtml(formatDate(parsed.date)) + '</p>' : '') +
      '<div>' + mdToHtml(parsed.body) + '</div>';
    return el;
  }

  var apiUrl = "https://api.github.com/repos/" + GH_USER + "/" + GH_REPO +
               "/contents/" + POSTS_DIR + "?ref=" + GH_BRANCH;
  console.log("[blog] fetching:", apiUrl);

  fetch(apiUrl).then(function (r) {
    console.log("[blog] list status:", r.status);
    if (!r.ok) throw new Error("GitHub API " + r.status);
    return r.json();
  }).then(function (files) {
    var mdFiles = files.filter(function (f) {
      return f.name.toLowerCase().endsWith(".md");
    }).sort(function (a, b) { return b.name.localeCompare(a.name); });
    console.log("[blog] found", mdFiles.length, "markdown files");

    if (mdFiles.length === 0) { statusEl.textContent = "No posts yet."; return; }

    return Promise.all(mdFiles.map(function (f) {
      return fetch(f.download_url).then(function (r) { return r.text(); })
        .then(function (text) { return { name: f.name, text: text }; });
    }));
  }).then(function (posts) {
    if (!posts) return;
    posts.forEach(function (p) {
      try { containerEl.appendChild(renderPost(p)); }
      catch (e) { console.error("[blog] render fail:", p.name, e); }
    });
    statusEl.style.display = "none";
    console.log("[blog] done");
  }).catch(function (err) {
    showError("Couldn't load posts: " + err.message);
  });
})();
