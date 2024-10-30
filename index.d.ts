import { FC, ReactElement, ReactNode } from "react";
import { ReactTestRenderer, ReactTestRendererJSON } from "react-test-renderer";

declare module "jest-snapshot-propifier" {}

type mockUtilTypeType = {
	name: string;
	element?: "span" | "div";
	props?: Record<string, unknown>;
};

type GetChildOfMock = {
	mock: FC<Record<string, unknown>>;
	props?: Record<string, unknown>;
	ctx?: Record<string, unknown>;
	lastParent: string;
};

export function createMock(arg0: mockUtilTypeType | string): jest.Mock;
export function create(
	component: ReactElement | JSX.Element | ReactNode,
	options?: { flushEffects: boolean }
): ReactTestRenderer;
export function snapshotOf(
	component: ReactElement | JSX.Element | ReactNode,
	options?: { flushEffects: boolean }
): ReactTestRendererJSON | ReactTestRendererJSON[];
export function getChildOfMock({
	mock,
	props,
	ctx,
	lastParent,
}: GetChildOfMock): FC;
