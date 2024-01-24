Bindery.makeBook({
  content: "#content",
  printSetup: {
    layout: Bindery.Layout.BOOKLET,
    paper: Bindery.Paper.AUTO_BLEED,
    marks: Bindery.Marks.CROP,
    bleed: '12pt',
  },
  pageSetup: {
    size: { width: "4.25in", height: "5.5in" }, // Lulu
    margin: {
      top: "0.5in",
      bottom: "0.5in",
      inner: "1.25in",
      outer: "1.25in",
    },
  },
  rules: [
    Bindery.PageBreak({
      selector: ".toc-section",
      position: "before",
      continue: "right",
    }),

    Bindery.PageBreak({
      selector: ".sectiontitle",
      position: "before",
      continue: "left",
    }),
    Bindery.PageBreak({
      selector: ".sectiontitlecon",
      position: "before",
      continue: "right",
    }),
    Bindery.PageBreak({
      selector: ".project-description",
      position: "before",
      continue: "right",
    }),
    Bindery.PageBreak({
      selector: ".list",
      position: "before",
      continue: "left",
    }),

    // Bindery.PageBreak({ selector: ".cover, h2, h3", continue: "right" }),
    Bindery.PageBreak({ selector: "h2, h3", continue: "right" }),
    Bindery.Split({
      selector: "p",
      toNext: "my-continues",
      fromPrevious: "my-from",
    }),
    // Bindery.PageBreak({ selector: '.refimg',   position: 'after', continue: 'left' }),
    Bindery.Split({
      selector: "imgfig",
      toNext: "my-continues",
      fromPrevious: "from-previous",
    }),
    Bindery.FullBleedPage({
      selector: ".cover",
      continue: "same",
    }),
    Bindery.FullBleedPage({
      selector: ".backcover",
      continue: "same",
    }),

    Bindery.FullBleedPage({
      selector: ".photobleed",
      continue: "same",
    }),

    Bindery.FullBleedPage({
      selector: ".colorpage",
      continue: "left",
    }),

    Bindery.FullBleedPage({
      selector: ".fullbleed",
      continue: "same",
    }),

    Bindery.FullBleedPage({
      selector: ".fullbleed2",
      continue: "right",
    }),

    Bindery.FullBleedSpread({
      selector: ".wide-figure",
      continue: "next",
      // rotate: 'clockwise',
    }),
    Bindery.FullBleedSpread({
      selector: ".wide-figure-emoji",
      continue: "next",
      // rotate: 'clockwise',
    }),
    Bindery.FullBleedSpread({
      selector: ".wide-figure-umbrella",
      continue: "next",
      // rotate: 'clockwise',
    }),

    Bindery.FullBleedSpread({
      selector: ".wide-figure",
      continue: "same",
      // rotate: 'clockwise',
    }),

    Bindery.PageReference({
      selector: ".toc a",
      replace: (el, number) => {
        el.insertAdjacentHTML(
          "afterbegin",
          `<span class="number">${number}</span>`
        );
        return el;
      },
    }),

    Bindery.RunningHeader({
      render: (page) => {
        const nullPageSelectors = [
          "#christo",
          "#mastaba",
          ".cover",
          ".backcover",
          ".title-section",
          ".credits-section",
          ".chapter-title",
          ".post-header",
          ".hero-figure",
          ".rotated-med-figure",
          ".med-figure",
          ".big-figure",
          ".colorpage",
          ".iframe",
        ];
        if (page.isEmpty) return `<div class="nothing"></div>`;
        else if (page.element.querySelector(nullPageSelectors.join(",")))
          return `<div class="nothing"></div>`;
        else if (page.isLeft)
          return `<span class="page-number-left">${page.number}</span>`;
        else if (page.isRight)
          return `<span class="page-number-right">${page.number}</span> `;
      },
    }),

    Bindery.Footnote({
      selector: "text-figure",
      render: (element, number) => {
        return "<i> Text" + number + "</i>:" + element.href;
      },
    }),

    Bindery.Counter({
      incrementEl: "figcaption",
      replaceEl: "figcaption",
      resetEl: ".post-header",
      replace: (el, counterValue) => {
        el.insertAdjacentHTML(
          "afterbegin",
          `<span class="figcaption-counter">${counterValue}. </span>`
        );
        return el;
      },
    }),
  ],
});
