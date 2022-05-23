import snakeCase from "lodash.snakecase";
import React from "react";
import { recursivelyProcessProps } from "./utils/recursivelyProcessProps";

type Base = { props?: Record<string, unknown>; element?: "span" | "div" };

interface CreateArgs extends Base {
	name: string;
}
interface Props extends Base {
	$name: string; //don't use "name" as this breaks stuff
}

type CreateFunc = (args: CreateArgs | string) => jest.Mock;

const Mock: React.FC<Props> = ({
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

const createMock: CreateFunc = (args) => {
	let elementProps: Props = { $name: "" };

	if (typeof args === "string") {
		elementProps.$name = args;
	} else {
		elementProps = {
			...args.props,
			element: args.element,
			$name: args.name,
		};
	}

	return jest
		.fn((override = {}) => <Mock {...elementProps} {...override} />)
		.mockName(elementProps.$name);
};

export { createMock };
