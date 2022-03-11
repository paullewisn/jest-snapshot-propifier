# jest-snapshot-propifier<!-- omit in toc -->

Reduce the size of snapshots while also encouraging atomic testing practices.

-   [createMock](#createmock)
    -   [Setup](#setup)
    -   [With no props](#with-no-props)
    -   [With basic props](#with-basic-props)
    -   [With objects as props](#with-objects-as-props)
    -   [With functions as props](#with-functions-as-props)
    -   [With components as props](#with-components-as-props)
    -   [With basic children](#with-basic-children)
    -   [With components as children](#with-components-as-children)
-   [snapshotOf](#snapshotof)
    -   [Basic use case](#basic-use-case)
    -   [With useEffect](#with-useeffect)
-   [create](#create)
    -   [Basic use case](#basic-use-case-1)

## createMock

returns: `jest.Mock`

Props and children are represented in a uniform and logical way. Props which require further testing are highlighted within the snapshot. Components are replaced with `div`s which have `data-attributes` set.

### Setup

`/Bar/__mocks__/index.ts`

```js
import { createMock } from "jest-snapshot-propifier";

export const Foo = createMock("Bar");
```

`/Foo/index.ts`

```js
export const Foo = (props) => <Bar {...props} />;
```

`/Foo/spec.tsx`

### With no props

```js
test("With no props", () => {
	expect(snapshotOf(<Foo />)).toMatchInlineSnapshot(`
    	      <div
    	        data-component="<Bar />"
    	      />
        `);
});
```

### With basic props

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

### With objects as props

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

### With functions as props

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

### With components as props

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

### With basic children

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

### With components as children

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

---

## snapshotOf

returns: `ReactTestRendererJSON | ReactTestRendererJSON[]`

Convenience wrapper for `react-test-renderer`'s snapshot generator

### Basic use case

`/Foo/index.ts`

```js
export const Foo = (props) => <Bar {...props} />;
```

`/Foo/spec.tsx`

```js
test("With no props", () => {
	expect(snapshotOf(<Foo />)).toMatchInlineSnapshot(`
    	      <div
    	        data-component="<Bar />"
    	      />
        `);
});
```

### With useEffect

`/Foo/index.ts`

```js
export const Foo = ({ extraFoo, ...props }) => {
	const [extraBar, setExtraBar] = useState();

	useEffect(() => {
		setExtraBar(extraFoo);
	}, [extraFoo]);

	return <Bar {...props} extraBar={extraBar} />;
};
```

Passing `{ flushEffects: true }` will allow `useEffect` to complete before creating the snapshot:

`/Foo/spec.tsx`

```jsx
test("With flushEffects", () => {
	expect(snapshotOf(<Foo extraFoo="🍓" />), { flushEffects: true })
		.toMatchInlineSnapshot(`
    	      <div
    	        data-component="<Bar />"
				data-extra-foo="🍓"
    	      />
        `);
});
```

...compared to `{ flushEffects: false }`:

`/Foo/spec.tsx`

```jsx
test("Without flushEffects", () => {
	expect(snapshotOf(<Foo extraFoo="🍓" />, { flushEffects: false }))
		.toMatchInlineSnapshot(`
    	      <div
    	        data-component="<Bar />"
    	      />
        `);
});
```

---

## create

returns `ReactTestRenderer`

Convenience wrapper for `react-test-renderer`'s renderer. Options as `snapshotOf`. Useful if there is a requirement to cause rerenders but need to ensure effects have been flushed on the original call.

### Basic use case

`/Foo/spec.tsx`

```js
test("With create", () => {
	const foo = create(<Foo extraFoo="🥝" />, { flushEffects: true });

	expect(Foo).toHaveBeenCalledTimes(1);
	expect(Foo).toHaveBeenCalledWith("🥝");

	act(() => {
		foo.update(<Foo extraFoo="🍉" />);
	});

	expect(Foo).toHaveBeenCalledTimes(2);
	expect(Foo).toHaveBeenCalledWith("🍉");

	//or use foo.toJSON() if you just want a snapshot
});
```
