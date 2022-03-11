import React from "react";
import { Mock } from "./components/Mock";

type mockUtilTypeType = {
	name: string;
	props?: Record<string, unknown>;
};

type mockUtilType = ({ name, props }: mockUtilTypeType) => jest.Mock;

const createMock: mockUtilType = ({ name, props }) =>
	jest
		.fn((override = {}) => <Mock $name={name} {...props} {...override} />)
		.mockName(name);

export { createMock };
