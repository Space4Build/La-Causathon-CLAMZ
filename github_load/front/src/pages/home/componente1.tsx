import { ProgramMetadata } from "@gear-js/api";
import { useState } from "react";
import { useApi, useAlert } from "@gear-js/react-hooks";
import { Button, Card, Center, Heading, VStack, Text } from "@chakra-ui/react";

function OutputStr() {
  const randomStrings = [
    "Today is 21th, June.",
    "I dont know your name.",
    "I can't feel, I am an Artifitial Intelligence.",
    "You look so lonely, I can fix that"
  ];
  const { api } = useApi();

  const alert = useAlert();

  const [fullState, setFullState] = useState<any | undefined>(0);

  const [numberState, setNumberState] = useState(0);
  // Add your programID
  const programIDFT =
  "0x215f7dccb5d078722634893d36ba70632f1bc180cb3148fb055e232fc08ac3d2";

// Add your metadata.txt
const meta =
  "00020000000100000000010100000000000000000102000000c50424000808696f48547261666669634c69676874416374696f6e00011014477265656e0000001859656c6c6f770001000c52656400020018507572706c6500030000040808696f44547261666669634c696768744576656e7400011014477265656e0000001859656c6c6f770001000c52656400020018507572706c6500030000080808696f4c496f547261666669634c696768745374617465000008013463757272656e745f6c696768740c0118537472696e67000124616c6c5f75736572731001585665633c284163746f7249642c20537472696e67293e00000c00000502001000000214001400000408180c001810106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001c01205b75383b2033325d00001c000003200000002000200000050300";

  const metadata = ProgramMetadata.from(meta);

  const getStateNum = () => {
    api.programState
      .read({ programId: programIDFT}, metadata)
      .then((result) => {
        setFullState(result.toJSON());
        var value = JSON.stringify(fullState.currentLight);
        if (value === JSON.stringify("Red")) {
          setNumberState(0);
          return 0;
        } else if (value === JSON.stringify("Green")) {
          setNumberState(1);
          return 1;
        } else if (value === JSON.stringify("Yellow")) {
          setNumberState(2);
          return 2;
        } else {
          setNumberState(3);
          return 3;
        }
      })
      .catch(({ message }: Error) => alert.error(message));

  };
  getStateNum();
  return (
    <Card>
      <Center  borderRadius="10px"
            w="100px"
            h="100px"
            backgroundColor={"white.300"}>
            {randomStrings[numberState]};
      </Center>
    </Card>
  );
}

export { OutputStr };
