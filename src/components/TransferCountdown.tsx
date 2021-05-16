export interface TransferCountdownProps {
  timeLeft: number;
}

function pad(value: number) {
  return value < 10 ? '0' + value : value.toString();
}

function formatCountdown(value: number) {
  const d = Math.floor(value / (60 * 60 * 24));
  const h = Math.floor((value / (60 * 60)) % 24);
  const m = Math.floor((value / 60) % 60);
  const s = Math.floor(value % 60);

  let result = `${pad(h)}:${pad(m)}:${pad(s)}`;
  if (d > 0) {
    result = `${pad(d)}:${value}`;
  }
  return result;
}

export default function TransferCountdown({
  timeLeft,
}: TransferCountdownProps) {
  return <p>{formatCountdown(timeLeft)}</p>;
}
