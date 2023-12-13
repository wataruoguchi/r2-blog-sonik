import { parseMd } from "./markdown";

describe("markdown", () => {
  describe("parseMd", () => {
    describe("when markdown is simple", () => {
      it("should parse markdown", () => {
        const { content } = parseMd(`# Hello`);
        expect(content).toEqual("<h1>Hello</h1>\n");
      });
    });

    describe("when markdown has frontmatter", () => {
      it("should parse markdown", () => {
        const markdown = `---
title: Hello World Title
tags: foo,bar
---
# Hello

Paragraph comes here.`;
        const { content, title, tags } = parseMd(markdown);
        expect(content).toEqual(
          `<h1>Hello</h1>\n<p>Paragraph comes here.</p>\n`,
        );
        expect(title).toEqual(`Hello World Title`);
        expect(tags).toEqual(["foo", "bar"]);
      });
    });

    // Prism and highlight.js are not working well with ESM, `ReferenceError: require is not defined`
    describe.skip("when markdown has code", () => {
      it("should parse markdown", () => {
        const markdown = `
\`\`\`ts
const foo = "bar";
\`\`\`
        `;
        const { content } = parseMd(markdown);
        expect(content).toEqual(
          `<pre><code class="language-ts"><span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token string">"bar"</span><span class="token punctuation">;</span>`,
        );
      });
    });

    describe("when markdown has emoji", () => {
      it("should parse markdown", () => {
        const markdown = `:smile:`;
        const { content } = parseMd(markdown);
        expect(content).toEqual(`<p>😄</p>\n`);
      });
    });
  });
});
