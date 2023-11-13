import React from "react";
import type { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address, AddressInput, EtherInput } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address } = useAccount();
  const [toAddress, setToAddress] = React.useState("");
  const [etherAmount, setEtherAmount] = React.useState("");

  const { data: balance } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "balance",
    args: [address],
  });

  const { writeAsync: transfer } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "transfer",
    args: [toAddress, parseEther(etherAmount)],
  });

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <Address address={address} />

        <div className="p-4 text-4xl">{balance ? formatEther(balance) : "..."}</div>

        <div>Send Eth to:</div>
        <div className="p-4">
          <AddressInput
            value={toAddress}
            placeholder="0x123..."
            onChange={v => {
              setToAddress(v);
            }}
          />
        </div>
        <div className="p-4">
          <EtherInput
            value={etherAmount}
            placeholder="0"
            onChange={v => {
              setEtherAmount(v);
            }}
          />
        </div>

        <div className="p-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              transfer();
            }}
          >
            {" "}
            Send{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
