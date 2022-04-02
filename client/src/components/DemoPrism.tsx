import { Prism } from "@mantine/prism";

const deleted = { color: "red", label: "-" };
const added = { color: "green", label: "+" };

function Demo() {
  return (
    <Prism
      language="tsx"
      withLineNumbers
      highlightLines={{
        3: deleted,
        4: deleted,
        5: deleted,
        7: added,
        8: added,
        9: added,
      }}
    >
      {`import { Button } from '@mantine/core';

        function Demo() {
        return <Button>Hello</Button>
        }

        function Usage() {
        return <ActionIcon>Hello</ActionIcon>;
        }`}
    </Prism>
  );
}

export default Demo;
