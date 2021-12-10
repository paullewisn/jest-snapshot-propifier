import React from "react";
import { snakeCase } from "lodash";
import { recursivelyProcessProps } from "../utils/recursivelyProcessProps";

type MockType = {
    $name: string;
};

const Mock: React.FC<MockType> = ({ $name, children, ...props }) => {
    const dataProps = Object.entries(props).reduce(
        (acc, [prop, val]) => ({
            ...acc,
            [`data-${snakeCase(prop)}`]: recursivelyProcessProps(prop, val),
        }),
        { "data-component": `<${$name} />` }
    );

    return (
        <div {...dataProps}>
            {typeof children === "function" ? children(props) : children}
        </div>
    );
};

export { Mock };
