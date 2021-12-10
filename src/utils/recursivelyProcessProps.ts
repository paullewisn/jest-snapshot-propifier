import { isValidElement } from "react";

const recursivelyProcessProps = (propName, propValue) => {
    switch (true) {
        case isValidElement(propValue):
            return "[! Component to test !]";

        case typeof propValue === "function":
            return "[! Function to test !]";

        case typeof propValue === "object" && propValue.length === undefined:
            return JSON.stringify(propValue);

        case typeof propValue === "object" && propValue.length >= 0:
            return propValue.map((value) => {
                const isMock = Boolean(value?.type?.getMockName);

                const childPropName = isMock && value?.type?.getMockName();
                return recursivelyProcessProps(
                    childPropName || propName,
                    value
                );
            });

        default:
            return propValue;
    }
};

export { recursivelyProcessProps };
