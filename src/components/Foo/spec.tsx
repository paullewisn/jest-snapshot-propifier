import { snapshotOf } from "../../snapshotOf";
import React from "react";
import Foo from ".";
import Bar from "../Bar";
import { createMock } from "../../createMock";

jest.mock("../Bar");

describe("<Foo />", () => {
	test("With no props", () => {
		expect(snapshotOf(<Foo />)).toMatchInlineSnapshot(`
		      <div
		        data-component="<Bar />"
		      />
	    `);
	});

	test("With basic props", () => {
		expect(snapshotOf(<Foo string="string" number={42} />))
			.toMatchInlineSnapshot(`
		        <div
		          data-component="<Bar />"
		          data-number={42}
		          data-string="string"
		        />
	    `);
	});

	test("With objects as props", () => {
		const muchWow = {
			string: "string",
			number: 42,
			object: { much: "wow" },
		};

		expect(snapshotOf(<Foo object={muchWow} />)).toMatchInlineSnapshot(`
		      <div
		        data-component="<Bar />"
		        data-object="{\\"string\\":\\"string\\",\\"number\\":42,\\"object\\":{\\"much\\":\\"wow\\"}}"
		      />
	    `);
	});

	test("With functions as props", () => {
		expect(snapshotOf(<Foo function={() => "function"} />))
			.toMatchInlineSnapshot(`
		      <div
		        data-component="<Bar />"
		        data-function="[! Function to test !]"
		      />
	    `);
		const mockedBar = Bar as jest.Mock;

		const [[barProps]] = mockedBar.mock.calls;

		expect(barProps.function()).toBe("function");
	});

	test("With components as props", () => {
		const InnerFoo = createMock({ name: "InnerFoo" });

		expect(snapshotOf(<Foo weirdFlex={<InnerFoo />} />))
			.toMatchInlineSnapshot(`
		      <div
		        data-component="<Bar />"
		        data-weird_flex="[! Component to test !]"
		      />
	    `);

		const mockedBar = Bar as jest.Mock;

		const [[barProps]] = mockedBar.mock.calls;
		const WeirdFlex = () => barProps.weirdFlex;

		expect(snapshotOf(<WeirdFlex />)).toMatchInlineSnapshot(`
		<div
		  data-component="<InnerFoo />"
		/>
	`);
	});

	test("With basic children", () => {
		expect(snapshotOf(<Foo>children</Foo>)).toMatchInlineSnapshot(`
		          <div
		            data-component="<Bar />"
		          >
		            children
		          </div>
	    `);
	});

	test("With components as children", () => {
		const InnerFoo = () => <>InnerFoo</>;

		expect(
			snapshotOf(
				<Foo>
					<InnerFoo />
				</Foo>
			)
		).toMatchInlineSnapshot(`
		      <div
		        data-component="<Bar />"
		      >
		        InnerFoo
		      </div>
	    `);
	});
});
