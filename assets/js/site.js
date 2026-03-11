(function () {
  "use strict";

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
      return;
    }

    callback();
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function debounce(callback, delay) {
    let timeoutId = null;

    return function debounced() {
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(function runDebounced() {
        callback.apply(null, args);
      }, delay);
    };
  }

  function parseJsonScript(id) {
    const node = document.getElementById(id);
    if (!node) {
      return null;
    }

    try {
      return JSON.parse(node.textContent);
    } catch (error) {
      return null;
    }
  }

  function highlightText(text, terms) {
    let highlighted = escapeHtml(text);

    terms.forEach(function applyTerm(term) {
      if (!term) {
        return;
      }

      const pattern = new RegExp("(" + escapeRegExp(term) + ")", "ig");
      highlighted = highlighted.replace(pattern, "<mark>$1</mark>");
    });

    return highlighted;
  }

  function normalizeTerms(query) {
    return query
      .toLowerCase()
      .split(/\s+/)
      .map(function sanitize(term) {
        return term.replace(/[^\w-]+/g, "");
      })
      .filter(Boolean);
  }

  function buildPreview(documentRecord, terms, config) {
    const source = (documentRecord.description || documentRecord.content || "").trim();
    if (!source) {
      return "";
    }

    const words = source.split(/\s+/);
    const matchIndex = words.findIndex(function findWord(word) {
      const loweredWord = word.toLowerCase();
      return terms.some(function matches(term) {
        return loweredWord.indexOf(term) !== -1;
      });
    });

    const startIndex = Math.max(0, (matchIndex === -1 ? 0 : matchIndex) - config.previewWordsBefore);
    const endIndex = Math.min(
      words.length,
      (matchIndex === -1 ? config.previewWordsBefore + config.previewWordsAfter : matchIndex + config.previewWordsAfter + 1)
    );

    let preview = words.slice(startIndex, endIndex).join(" ");
    if (startIndex > 0) {
      preview = "... " + preview;
    }
    if (endIndex < words.length) {
      preview += " ...";
    }

    return preview;
  }

  function isEditableTarget(target) {
    if (!target) {
      return false;
    }

    const tagName = target.tagName ? target.tagName.toLowerCase() : "";
    return target.isContentEditable || tagName === "input" || tagName === "textarea" || tagName === "select";
  }

  function initSearch() {
    const config = parseJsonScript("siteSearchConfig");
    if (!config) {
      return;
    }

    const searchRoot = document.getElementById("siteSearch");
    const inputElement = document.getElementById("siteSearchInput");
    const panelElement = document.getElementById("siteSearchPanel");
    const statusElement = document.getElementById("siteSearchStatus");
    const resultsElement = document.getElementById("siteSearchResults");

    if (!searchRoot || !inputElement || !panelElement || !statusElement || !resultsElement) {
      return;
    }

    const searchConfig = {
      previewWordsBefore: Number(config.previewWordsBefore) || 5,
      previewWordsAfter: Number(config.previewWordsAfter) || 12,
      maxResults: Number(config.maxResults) || 10,
      dataUrl: config.dataUrl,
      displayRelativeUrl: Boolean(config.displayRelativeUrl),
      focusShortcutKey: config.focusShortcutKey || "",
    };

    let documents = [];
    let documentsById = new Map();
    let searchIndex = null;
    let loadPromise = null;

    function setStatus(message) {
      statusElement.textContent = message;
    }

    function clearResults() {
      resultsElement.innerHTML = "";
    }

    function openPanel() {
      panelElement.hidden = false;
      inputElement.setAttribute("aria-expanded", "true");
      searchRoot.classList.add("is-open");
    }

    function closePanel() {
      panelElement.hidden = true;
      inputElement.setAttribute("aria-expanded", "false");
      searchRoot.classList.remove("is-open");
    }

    async function loadDocuments() {
      if (loadPromise) {
        return loadPromise;
      }

      setStatus("Loading search index...");
      inputElement.disabled = true;

      loadPromise = window
        .fetch(searchConfig.dataUrl, { credentials: "same-origin" })
        .then(function parseResponse(response) {
          if (!response.ok) {
            throw new Error("Search data request failed with status " + response.status);
          }

          return response.json();
        })
        .then(function storeDocuments(payload) {
          documents = payload.map(function mapDocument(record) {
            const mergedRecord = {
              id: record.id || record.url,
              title: record.title || record.url || "Untitled",
              url: record.url || "#",
              display_url: record.display_url || record.url || "#",
              collection: record.collection || "page",
              description: record.description || "",
              content: record.content || "",
            };

            mergedRecord.search_text = [
              mergedRecord.title,
              mergedRecord.collection,
              mergedRecord.display_url,
              mergedRecord.description,
              mergedRecord.content,
            ]
              .join(" ")
              .toLowerCase();

            return mergedRecord;
          });

          documentsById = new Map(
            documents.map(function toEntry(record) {
              return [record.id, record];
            })
          );

          if (window.lunr && documents.length > 0) {
            searchIndex = window.lunr(function buildSearchIndex() {
              this.ref("id");
              this.field("title", { boost: 20 });
              this.field("collection", { boost: 5 });
              this.field("description", { boost: 3 });
              this.field("content");

              documents.forEach(
                function addDocument(record) {
                  this.add(record);
                },
                this
              );
            });
          }

          return documents;
        })
        .catch(function resetFailedLoad(error) {
          loadPromise = null;
          throw error;
        })
        .finally(function finishLoad() {
          inputElement.disabled = false;
        });

      return loadPromise;
    }

    function fallbackSearch(query, terms) {
      return documents
        .filter(function matchesDocument(record) {
          return terms.every(function allTermsPresent(term) {
            return record.search_text.indexOf(term) !== -1;
          });
        })
        .slice(0, searchConfig.maxResults);
    }

    function indexedSearch(query, terms) {
      if (!searchIndex || terms.length === 0) {
        return [];
      }

      try {
        const matches = searchIndex.query(function buildQuery(queryBuilder) {
          terms.forEach(function addTerm(term) {
            queryBuilder.term(term, { boost: 10 });
            queryBuilder.term(term, {
              boost: 6,
              wildcard: window.lunr.Query.wildcard.TRAILING,
            });
          });
        });

        return matches
          .map(function resolveMatch(match) {
            return documentsById.get(match.ref);
          })
          .filter(Boolean)
          .slice(0, searchConfig.maxResults);
      } catch (error) {
        return fallbackSearch(query, terms);
      }
    }

    function renderResults(query, matchingDocuments) {
      const terms = normalizeTerms(query);
      clearResults();
      openPanel();

      if (!query.trim()) {
        setStatus("Start typing to search the site.");
        return;
      }

      if (matchingDocuments.length === 0) {
        setStatus('No results for "' + query + '".');
        return;
      }

      setStatus(
        "Showing " +
          matchingDocuments.length +
          " result" +
          (matchingDocuments.length === 1 ? "" : "s") +
          "."
      );

      const fragment = document.createDocumentFragment();

      matchingDocuments.forEach(function renderDocument(record) {
        const link = document.createElement("a");
        link.className = "list-group-item list-group-item-action site-search-result";
        link.href = record.url;

        const preview = buildPreview(record, terms, searchConfig);
        const displayUrl = searchConfig.displayRelativeUrl ? record.display_url : record.url;
        const collection = record.collection ? record.collection.replace(/_/g, " ") : "page";

        link.innerHTML =
          '<div class="d-flex w-100 justify-content-between gap-3">' +
          '<div class="site-search-result-body">' +
          '<h3 class="site-search-result-title">' +
          highlightText(record.title, terms) +
          "</h3>" +
          (preview
            ? '<p class="site-search-result-preview mb-2">' + highlightText(preview, terms) + "</p>"
            : "") +
          '<div class="site-search-result-meta">' +
          '<span class="site-search-result-collection">' +
          escapeHtml(collection) +
          "</span>" +
          '<span class="site-search-result-url">' +
          escapeHtml(displayUrl) +
          "</span>" +
          "</div>" +
          "</div>" +
          "</div>";

        fragment.appendChild(link);
      });

      resultsElement.appendChild(fragment);
    }

    const runSearch = debounce(function executeSearch(query) {
      const trimmedQuery = query.trim();
      const terms = normalizeTerms(trimmedQuery);

      if (!trimmedQuery) {
        renderResults("", []);
        return;
      }

      const matches = searchIndex ? indexedSearch(trimmedQuery, terms) : fallbackSearch(trimmedQuery, terms);
      renderResults(trimmedQuery, matches);
    }, 80);

    function prepareSearch() {
      openPanel();
      loadDocuments()
        .then(function afterLoad() {
          if (inputElement.value.trim()) {
            runSearch(inputElement.value);
            return;
          }

          setStatus("Start typing to search the site.");
        })
        .catch(function onError() {
          clearResults();
          openPanel();
          setStatus("Search is unavailable right now.");
        });
    }

    inputElement.addEventListener("input", function onInput(event) {
      runSearch(event.target.value);
    });

    inputElement.addEventListener("focus", prepareSearch);
    inputElement.addEventListener("click", prepareSearch);

    inputElement.addEventListener("keydown", function onInputKeyDown(event) {
      if (event.key !== "Escape") {
        return;
      }

      closePanel();
      inputElement.blur();
    });

    if (searchConfig.focusShortcutKey) {
      document.addEventListener("keydown", function onKeyDown(event) {
        if (event.defaultPrevented || event.altKey || event.shiftKey) {
          return;
        }

        if (isEditableTarget(event.target)) {
          return;
        }

        const shortcutKey = String(searchConfig.focusShortcutKey).toLowerCase();
        const matchesKey = event.key && event.key.toLowerCase() === shortcutKey;
        const usesModifier = event.ctrlKey || event.metaKey;
        if (!matchesKey || !usesModifier) {
          return;
        }

        event.preventDefault();
        inputElement.focus();
        inputElement.select();
        prepareSearch();
      });
    }

    document.addEventListener("mousedown", function onDocumentMouseDown(event) {
      if (searchRoot.contains(event.target)) {
        return;
      }

      closePanel();
    });

    document.addEventListener("focusin", function onDocumentFocusIn(event) {
      if (searchRoot.contains(event.target)) {
        return;
      }

      closePanel();
    });
  }

  function initMermaid() {
    if (!window.mermaid) {
      return;
    }

    const codeBlocks = document.querySelectorAll("code.language-mermaid");
    if (codeBlocks.length === 0) {
      return;
    }

    const mermaidNodes = [];

    codeBlocks.forEach(function transformCodeBlock(codeBlock) {
      const diagram = codeBlock.textContent.trim();
      if (!diagram) {
        return;
      }

      const container = document.createElement("div");
      container.className = "mermaid";
      container.textContent = diagram;

      const replaceTarget =
        codeBlock.closest("div.highlighter-rouge") ||
        codeBlock.closest("figure.highlight") ||
        codeBlock.closest("pre") ||
        codeBlock;

      replaceTarget.replaceWith(container);
      mermaidNodes.push(container);
    });

    if (mermaidNodes.length === 0) {
      return;
    }

    const userConfig = window.siteMermaidUserConfig || {};
    window.mermaid.initialize(
      Object.assign(
        {
          startOnLoad: false,
        },
        userConfig
      )
    );

    window.mermaid.run({ nodes: mermaidNodes });
  }

  onReady(function initializeSiteFeatures() {
    initSearch();
    initMermaid();
  });
})();
