import snakeCase from "lodash.snakecase";
import React from "react";
import { recursivelyProcessProps } from "./utils/recursivelyProcessProps";

type mockUtilTypeType = {
	name: string;
	props?: Record<string, unknown>;
	element?: "span" | "div";
};

type mockUtilType = ({ name, props }: mockUtilTypeType) => jest.Mock;

type MockType = {
	$name: string;
	element?: HTMLElement;
};

const Mock: React.FC<MockType> = ({
	$name,
	children,
	element = "div",
	...props
}) => {
	const dataProps = Object.entries(props).reduce(
		(acc, [prop, val]) => ({
			...acc,
			[`data-${snakeCase(prop)}`]: recursivelyProcessProps(prop, val),
		}),
		{ "data-component": `<${$name} />` }
	);

	const childrenToRender =
		typeof children === "function" ? children(props) : children;

	switch (element) {
		case "div":
			return <div {...dataProps}>{childrenToRender}</div>;
		case "span":
			return <span {...dataProps}>{childrenToRender}</span>;
		default:
			break;
	}
};

const createMock: mockUtilType = ({ name, props, element }) =>
	jest
		.fn((override = {}) => (
			<Mock $name={name} {...props} {...override} element={element} />
		))
		.mockName(name);

export { createMock };
