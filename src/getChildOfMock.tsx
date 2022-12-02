/**
 * Utility method to return a nested child mock from a parent. Useful for partial snapshots. Quite slow so use sparingly.
 */
import React, { FC } from "react";

type GetChildOfMock = {
	mock: FC<Record<string, unknown>>;
	props?: Record<string, unknown>;
	ctx?: Record<string, unknown>;
	lastParent: string;
};

export const getChildOfMock = ({
	mock,
	props = {},
	ctx = {},
	lastParent,
}: GetChildOfMock) => {
	let child;

	const parent = mock(props, ctx);

	if (!parent?.type?.getMockName) {
		// eslint-disable-next-line react/display-name
		return () => <>{"[!Mock is not an instance of jest.fn!]"}</>;
	}

	try {
		JSON.stringify(parent, (_, val) => {
			if (val && val.type?.getMockName?.() === lastParent)
				throw val.props.children;
			return val;
		});
	} catch (children) {
		child = () => children;
	}

	return (
		child ||
		(() => <>{`[!No component With MockName=${lastParent} Found!]`}</>)
	);
};
