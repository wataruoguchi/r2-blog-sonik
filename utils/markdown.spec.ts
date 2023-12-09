import { parseMarkdown } from "./markdown";

describe("markdown", () => {
  describe("parseMarkdown", () => {
    describe("when markdown has no frontmatter", () => {
      it("should parse markdown", () => {
        const { content, title, tags } = parseMarkdown(`# Hello`);
        expect(content).toEqual("<h1>Hello</h1>\n");
        expect(title).toEqual("");
        expect(tags).toEqual([]);
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
        const { content, title, tags } = parseMarkdown(markdown);
        expect(content).toEqual(
          `\n<h1>Hello</h1>\n<p>Paragraph comes here.</p>\n`,
        );
        expect(title).toEqual(`Hello World Title`);
        expect(tags).toEqual(["foo", "bar"]);
      });
    });
  });
});
