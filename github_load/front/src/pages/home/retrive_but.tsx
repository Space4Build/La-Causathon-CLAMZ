import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ProgramMetadata } from "@gear-js/api";
import { Button, Card, Center, Heading, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";

function Comp_2() {
  const alert = useAlert();
  const { accounts, account } = useAccount();
  const { api } = useApi();
  const [fullState, setFullState] = useState<any | undefined>(0);

  const ColorState=["La Constitución Política del Perú no contempla la posibilidad de adquirir la propiedad de un terreno de tierra simplemente por habitarlo durante un período de tiempo determinado, como dos años. La adquisición de la propiedad por posesión (usucapión) está regulada en el Código Civil peruano. El Código Civil del Perú establece que la posesión continuada y pacífica de un bien inmueble puede llevar a la adquisición de su propiedad a través de la usucapión. Para ello, se deben cumplir ciertos requisitos: Posesión continua y pacífica y Plazo legal."];

  // Add your programID
  const programIDFT =
  "0xbf4536c0a377d93e9be5f222cb4c246f8f7c7ec4155d078cf6fddae3b43dbd1b";

// Add your metadata.txt
const meta =
  "00020000000100000000010600000000000000000109000000610a34000808696f484149506970656c696e696e67416374696f6e00011c18456e61626c650000001c44697361626c6500010030526567697374657255736572000200204164645175657279040004012c5665633c537472696e673e0003002041646453636f72650400080118537472696e67000400244164644f7574707574040004012c5665633c537472696e673e00050030414956616c69646174696f6e04000c011c4163746f724964000600000400000208000800000502000c10106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001001205b75383b2033325d000010000003200000001400140000050300180418526573756c74080454011c044501200108084f6b04001c000000000c45727204002000000100001c0808696f444149506970656c696e696e674576656e7400011c18456e61626c650000001c44697361626c65000100285265706c795175657279040004012c5665633c537472696e673e0002002853636f72654164646564000300385573657252656769737465726564000400384f75747075745265636569766564000500284163746f7256616c696400060000200808696f184572726f72730001041c4e6f745573657200000000240808696f4c496f4149506970656c696e696e675374617465000014013463757272656e745f6c69676874080118537472696e6700011475736572732801305665633c4163746f7249643e0001187175657279732c016c5665633c284163746f7249642c205665633c537472696e673e293e00013463757272656e745f73636f7265080118537472696e6700011c6f7574707574732c016c5665633c284163746f7249642c205665633c537472696e673e293e0000280000020c002c000002300030000004080c0400";

  const metadata = ProgramMetadata.from(meta);
  const message: any = {
    destination: programIDFT, // programId
    payload: {"addoutput":[ColorState]},
    gasLimit: 98998192450,
    value: 0,
  };

  const signer = async () => {
    const localaccount = account?.address;
    const isVisibleAccount = accounts.some(
      (visibleAccount) => visibleAccount.address === localaccount
    );

    if (isVisibleAccount) {
      // Create a message extrinsic
      const transferExtrinsic = await api.message.send(message, metadata);

      const injector = await web3FromSource(accounts[0].meta.source);

      transferExtrinsic
        .signAndSend(
          account?.address ?? alert.error("No account"),
          { signer: injector.signer },
          ({ status }) => {
            if (status.isInBlock) {
              alert.success(status.asInBlock.toString());
            } else {
              console.log("In Process");
              if (status.type === "Finalized") {
                alert.success(status.type);
              }
            }
          }
        )
        .catch((error: any) => {
          console.log(":( transaction failed", error);
        });
    } else {
      alert.error("Account not available to sign");
    }
  };

  return (
    <Button backgroundColor="gray.300" on onClick={signer}>retrive</Button>
  );
}


export { Comp_2 };
