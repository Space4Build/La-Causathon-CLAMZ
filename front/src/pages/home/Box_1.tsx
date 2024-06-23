import { ProgramMetadata } from "@gear-js/api";
import { useState } from "react";
import { useApi, useAlert } from "@gear-js/react-hooks";
import { Button, Card, Center, Heading, VStack, Text } from "@chakra-ui/react";

function AiState() {
  const { api } = useApi();

  const alert = useAlert();

  const [fullState, setFullState] = useState<any | undefined>(0);

  const [numberState, setNumberState] = useState(0);

  const State = [
    "Enable",
    "Disable"
  ];

  const ColorState=[
    "green.300",
    "red.300"
  ];

  const programIDFT =
  "0x8227ab829d40eaa02213f7d64f68cf5319179c2b6214cca27980b8a7ce009d73";

// Add your metadata.txt
const meta =
  "000200000001000000000101000000000000000001020000004d0424000808696f48547261666669634c69676874416374696f6e00010818456e61626c650000001c44697361626c6500010000040808696f44547261666669634c696768744576656e7400010818456e61626c650000001c44697361626c6500010000080808696f4c496f547261666669634c696768745374617465000008013463757272656e745f6c696768740c0118537472696e67000124616c6c5f75736572731001585665633c284163746f7249642c20537472696e67293e00000c00000502001000000214001400000408180c001810106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001c01205b75383b2033325d00001c000003200000002000200000050300";

  const metadata = ProgramMetadata.from(meta);

  const getStateEn = () => {
    api.programState
      .read({ programId: programIDFT}, metadata)
      .then((result) => {
        setFullState(result.toJSON());
        var value = JSON.stringify(fullState.currentLight);
        if (value === JSON.stringify("Enable")) {
          setNumberState(0);
          return 0;
        } else {
          setNumberState(1);
        }
      })
      .catch(({ message }: Error) => alert.error(message));

  };
  getStateEn();
  return (
    <Card>
      <Center  borderRadius="10px"
            w="100px"
            h="100px"
            backgroundColor={ColorState[numberState]}>
            {State[numberState]}
      </Center>
    </Card>
  );
}

export { AiState };
