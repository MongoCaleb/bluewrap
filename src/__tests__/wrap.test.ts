import * as assert from "assert";
import wrap from "../wrap";

describe("wrap", () => {
	describe("should correctly wrap text", () => {
		it("should wrap with one character", () => {
			const wrappedText = wrap("test", ",", "test");
			assert.equal(wrappedText, ",test,");
		});

		it("should wrap with multiple character", () => {
			const wrappedText = wrap("test", "--", "test");
			assert.equal(wrappedText, "--test--");
		});

		describe("should wrap with correct predefined pattern", () => {
			it("should wrap with {}", () => {
				assert.equal(wrap("test", "}", "test"), "{test}");
				assert.equal(wrap("test", "{", "test"), "{test}");
			});

			it("should wrap with «»", () => {
				assert.equal(wrap("test", "»", "test"), "«test»");
				assert.equal(wrap("test", "«", "test"), "«test»");
			});

			it("should wrap with ()", () => {
				assert.equal(wrap("test", ")", "test"), "(test)");
				assert.equal(wrap("test", "(", "test"), "(test)");
			});

			it("should wrap with []", () => {
				assert.equal(wrap("test", "]", "test"), "[test]");
				assert.equal(wrap("test", "[", "test"), "[test]");
			});

			it("should wrap with <>", () => {
				assert.equal(wrap("test", ">", "test"), "<test>");
				assert.equal(wrap("test", "<", "test"), "<test>");
			});
		});

		describe("should wrap with more complex pattern", () => {
			it("should wrap with <!--", () => {
				assert.equal(wrap("test", "<!--", "test"), "<!--test--!>");
				assert.equal(wrap("test", "--!>", "test"), "<!--test--!>");
			});

			it("should wrap with {{}}", () => {
				assert.equal(wrap("test", "{{", "test"), "{{test}}");
				assert.equal(wrap("test", "}}", "test"), "{{test}}");
			});

			it("should wrap with {{{ }}}", () => {
				assert.equal(wrap("test", "{{{", "test"), "{{{test}}}");
				assert.equal(wrap("test", "}}}", "test"), "{{{test}}}");
			});

			it("should wrap with <%%>", () => {
				assert.equal(wrap("test", "<%", "test"), "<%test%>");
				assert.equal(wrap("test", "%>", "test"), "<%test%>");
			});

			it("should wrap with {%%}", () => {
				assert.equal(wrap("test", "{%", "test"), "{%test%}");
				assert.equal(wrap("test", "%}", "test"), "{%test%}");
			});
		});
	});

	describe("should correctly wrap with custom pattern", () => {
		it("wrap with log pattern", () => {
			const wrappedText = wrap("test", "log", "test");
			assert.equal(wrappedText, "console.log(`test`, test)");
		});

		it("wrap with promise pattern", () => {
			const wrappedText = wrap("test", "promise", "test");
			assert.equal(wrappedText, "new Promise((yeah, nah) => yeah(test))");
		});
	});
});
