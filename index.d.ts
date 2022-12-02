import { FC, ReactElement } from "react";
import { ReactTestRenderer, ReactTestRendererJSON } from "react-test-renderer";

declare module "jest-snapshot-propifier" {}

type mockUtilTypeType = {
	name: string;
	props?: Record<string, unknown>;
	element?: "span" | "div";
};

type GetChildOfMock = {
	mock: FC<Record<string, unknown>>;
	props?: Record<string, unknown>;
	ctx?: Record<string, unknown>;
	lastParent: string;
};

export function createMock({ name, props }: mockUtilTypeType): jest.Mock;
export function create(
	component: ReactElement | JSX.Element,
	options?: { flushEffects: boolean }
): ReactTestRenderer;
export function snapshotOf(
	component: ReactElement | JSX.Element,
	options?: { flushEffects: boolean }
): ReactTestRendererJSON | ReactTestRendererJSON[];
export function getChildOfMock({
	mock,
	props,
	ctx,
	lastParent,
}: GetChildOfMock): ReactElement | JSX.Element;
