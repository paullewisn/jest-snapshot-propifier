import { ReactElement } from "react";
import { ReactTestRendererJSON } from "react-test-renderer";
import { create } from "./create";

type SnapshotOf = (
	component: ReactElement | JSX.Element,
	options?: { flushEffects: boolean }
) => ReactTestRendererJSON | ReactTestRendererJSON[];

/*
	flushEffects: true  - allow useEffects to complete before creating the rendered component
				  false - default behaviour
*/
const snapshotOf: SnapshotOf = (component, options) =>
	create(component, options).toJSON();

export { snapshotOf };
