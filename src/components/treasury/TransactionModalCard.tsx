import TokenIcon from "@components/icons/token";

export default function TransactionModalCard() {
  return (
    <div className="border-border flex w-full items-center justify-center space-x-1.5 rounded-lg border p-2.5">
      <div>
        <TokenIcon />
      </div>
      <div className="flex w-full justify-between">
        <div>
          <p className="font-semibold">Deposit</p>
          <p className="text-sm">last Monday at 2:00 PM</p>
        </div>
        <div className="flex w-fit space-x-1.5">
          <div className="flex h-full w-fit space-x-2">
            <div>
              <p className="font-semibold">+90k USDC</p>
              <p className="text-sm">$89937.07</p>
            </div>
          </div>
          <div className="flex h-full flex-col justify-center"></div>
        </div>
      </div>
    </div>
  );
}
