class DiffViewer extends HTMLElement {
  #diffContainer;
  constructor() {
    super();
    let shadow = this.attachShadow({ mode: "open" });
    let stylesheetEl = shadow.appendChild(document.createElement("link"));
    stylesheetEl.rel = "stylesheet";
    stylesheetEl.href = "https://cdn.jsdelivr.net/npm/diff2html@3.4.32/bundles/css/diff2html.min.css";
    shadow.appendChild(document.createElement("style")).innerText = `
      .d2h-wrapper {
        color: initial;
        background-color: white;
        filter: invert(1);
      }
      .d2h-tag {
        filter: invert(1);
        background-color: black;
      }
      .d2h-code-line del {
        background-color: #b8fffb;
      }
      .d2h-code-line ins {
        background-color: #f197f2;
      }
      .d2h-ins {
        background-color: #ffdbff;
        border-color: #e2b6e2;
      }
      .d2h-file-diff .d2h-ins.d2h-change {
        background-color: #ede;
      }
      .d2h-del {
        background-color: #e7fefd;
        border-color: #afe9e9;
      }
      .d2h-file-diff .d2h-del.d2h-change {
        background-color: #cedafd;
      }
    `;
    this.#diffContainer = shadow.appendChild(document.createElement("div"));
  }
  loadDiff(diffString) {
    this.#diffContainer.innerHTML = Diff2Html.html(diffString, { drawFileList: true, matching: "lines" });
    this.#diffContainer.querySelectorAll(".d2h-file-name").forEach(el => 
      el.addEventListener("click", () => this.#diffContainer.querySelector(el.getAttribute("href"))?.scrollIntoView())
    );
  }
}

customElements.define("diff-viewer", DiffViewer);