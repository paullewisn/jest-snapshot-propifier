#### 1.5.0

-   `getChildOfMock` Utility method to return a nested child mock from a parent. Useful for partial snapshots. Quite slow so use sparingly.

#### 1.4.1

-   React 18

#### 1.4.0

-   `createMock` can now either be passed an object or just a string. It a string is passed then this will be mapped to the mock name (string is not sanitised, beware of dragons 🐉)

#### 1.3.0

-   Added typings

#### 1.2.0

-   Added ability to set root element for mock

#### 1.1.2

-   Better null handling (bug)

### 1.1.0

-   Added options argument to `snapshotOf`.
-   Added `flushEffect` to options. This allows `useEffect` calls to complete before the snapshot is created.
-   Added `create` function as sugar for using `react-test-renderer`'s `act`. No need to worry about which `act` you are importing.

## 1.0.0

-   Initial release
