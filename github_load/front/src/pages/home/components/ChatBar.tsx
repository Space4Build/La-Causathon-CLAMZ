import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatWindow from './ChatWindow';
import { FaUser, FaRobot } from 'react-icons/fa';
import { AiOutlineFilePdf } from 'react-icons/ai';
import './ChatBar.css';
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ProgramMetadata } from "@gear-js/api";
import { Button } from "@chakra-ui/react";


// Definición de tipos para los mensajes
type Message = {
  type: 'user' | 'bot' | 'file';
  text: string;
};

const ChatBar: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [taskCount, setTaskCount] = useState(1);

  const handleSend = (message: string) => {
    const newMessages: Message[] = [
      ...messages,
      { type: 'user', text: `${message}` },
      // { type: 'bot', text: `Task ${taskCount} - Bot: ${message}` }
    ];
    setMessages(newMessages);
    setTaskCount(taskCount + 1);
  };

  const handleFileUpload = (file: File) => {
    const newMessages: Message[] = [
      ...messages,
      { type: 'file', text: `Uploaded File: ${file.name}` }
    ];
    setMessages(newMessages);
  };
  console.log(messages);
  const alert = useAlert();
  const { accounts, account } = useAccount();
  const { api } = useApi();

  // Add your programID
  const programIDFT =
  "0xd5d1eb08af166ac3bb210bac52814324a0e33501edb8c57e9102e81c820c09a2";

// Add your metadata.txt
const meta =
  "00020000000100000000010100000000000000000102000000750424000808696f48547261666669634c69676874416374696f6e00010c14477265656e0000001859656c6c6f770001000c52656400020000040808696f44547261666669634c696768744576656e7400010c14477265656e0000001859656c6c6f770001000c52656400020000080808696f4c496f547261666669634c696768745374617465000008013463757272656e745f6c696768740c0118537472696e67000124616c6c5f75736572731001585665633c284163746f7249642c20537472696e67293e00000c00000502001000000214001400000408180c001810106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001c01205b75383b2033325d00001c000003200000002000200000050300";

  const metadata = ProgramMetadata.from(meta);

  const message: any = {
    destination: programIDFT, // programId
    payload: "Green",
    gasLimit: 98998192450,
    value: 0,
  };


  return (
    <div className="chat-bar">
      <h2>Task Manager</h2>
      <ChatWindow messages={messages} />
      <ChatInput onSend={handleSend} onFileUpload={handleFileUpload} />
    </div>
  );
};

export default ChatBar;
