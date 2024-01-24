      const {
        makeBook,
        createRule,
        PageBreak,
        FullBleedPage,
        FullBleedSpread,
        PageReference,
        RunningHeader,
        Footnote,
        Paper,
        Layout,
        Marks,
      } = Bindery;

      const cleanedURL = (url) => {
        let clean = url;
        if (url[url.length - 1] === '/') {
          clean = url.substr(0, url.length - 1);
        }
        clean = clean.replace('http://', '').replace('https://', '')
        return clean;
      }

      Bindery.makeBook({
        content: "#content",
        printSetup: {
          paper: Paper.AUTO_BLEED,
          bleed: '0.125in', // Blurb
        },
        pageSetup: {
          size: { width: '4.25in', height: '5.5in' }, // Lulu
          margin: {
            top: '0in',
            bottom: '0in',
            inner: '0in',
            outer: '0in',
          },
        },
        pageNumberOffset: -4,
        rules: [
          createRule({
            selector: '.colophon-wrap',
            beforeAdd: (el) => {
              updateColophon(el, { version: Bindery.version });
              return el;
            }
          }),
          PageBreak({
            selector: '.h1-page',
            position: 'before',
            continue: 'right',
          }),
          FullBleedPage({
            selector: '#cover, .h1-page',
            continue: 'right',
          }),
          PageBreak({
            selector: '#colophon',
            position: 'before',
            continue: 'right',
          }),
          PageBreak({
            selector: '.highlight',
            position: 'avoid',
          }),
        //   PageBreak({
        //     selector: '.end',
        //     position: 'avoid',
        //     continue: 'right'
        //   }),
          PageReference({
            selector: '.toc-num',
            replace: (el, num) => {
              el.textContent = `${num}`;
              return el;
            },
          }),
        //   FullBleedPage({
        //     selector: '.end',
        //     continue: 'same'
        //   }),
        //   RunningHeader({
        //     render: (page) => {
        //       if (page.isEmpty || page.number < 1) return '';
        //       if (page.isLeft) return `${page.number} · Bindery.js `;
        //       else if (page.isRight) {
        //         let section = page.heading.h1 || '';
        //         if (section !== '') return `${section} · ${page.number}`;
        //         else return `${page.number}`;
        //       }
        //     },
        //   }),
          Footnote({
            selector: '.post-content a',
            render: (el, num) =>  `<i>${num}</i>: ${cleanedURL(el.href)}`,
          }),
        ]
      });
