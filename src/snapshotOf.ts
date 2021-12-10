import { ReactElement } from "react";
import { ReactTestRendererJSON, create } from "react-test-renderer";

type SnapshotOf = (
    component: ReactElement | JSX.Element
) => ReactTestRendererJSON | ReactTestRendererJSON[];

const snapshotOf: SnapshotOf = (component) => create(component).toJSON();

export default snapshotOf;
