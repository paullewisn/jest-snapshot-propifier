# jest-snapshot-propifier<!-- omit in toc -->

Reduce the size of snapshots while also encouraging atomic testing practices.

-   [createMock](#createmock)
    -   [Examples](#examples)
        -   [With no props](#with-no-props)
        -   [With basic props](#with-basic-props)
        -   [With objects as props](#with-objects-as-props)
        -   [With functions as props](#with-functions-as-props)
        -   [With components as props](#with-components-as-props)
        -   [With basic children](#with-basic-children)
        -   [With components as children](#with-components-as-children)

## createMock

Props and children are represented in a uniform and logical way. Props which require further testing are highlighted within the snapshot. Components are replaced with `div`s which have `data-attributes` set.

`/Bar/__mocks__/index.ts`

```js
import { createMock } from "jest-snapshot-propifier";

export const Foo = createMock("Bar");
```

### Examples

`/Foo/index.ts`

```js
export const Foo = (props) => <Bar {...props} />;
```

`/Foo/spec.tsx`

##### With no props

```js
test("With no props", () => {
	expect(snapshotOf(<Foo />)).toMatchInlineSnapshot(`
    	      <div
    	        data-component="<Bar />"
    	      />
        `);
});
```

##### With basic props

```js
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
```

##### With objects as props

```js
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
```

##### With functions as props

```js
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
```

##### With components as props

```js
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
```

##### With basic children

```js
test("With basic children", () => {
	expect(snapshotOf(<Foo>children</Foo>)).toMatchInlineSnapshot(`
    	          <div
    	            data-component="<Bar />"
    	          >
    	            children
    	          </div>
        `);
});
```

##### With components as children

```js
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
```
