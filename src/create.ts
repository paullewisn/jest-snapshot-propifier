import { ReactElement } from "react";
import {
	create as rtrCreate,
	act,
	ReactTestRenderer,
} from "react-test-renderer";

type Create = (
	component: ReactElement | JSX.Element,
	options?: { flushEffects: boolean }
) => ReactTestRenderer;

/*
	flushEffects: true  - allow useEffects to complete before creating the rendered component
				  false - default behaviour
*/
const create: Create = (component, options) => {
	let renderer: ReactTestRenderer;
	if (options?.flushEffects) {
		act(() => {
			renderer = rtrCreate(component);
		});
	} else {
		renderer = rtrCreate(component);
	}

	return renderer;
};

export { create };
