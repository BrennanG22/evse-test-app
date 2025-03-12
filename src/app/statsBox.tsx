interface StatsBoxProps {
  current: number | null;
  voltage: number | null;
  powerLimit: number | null;
  currentPower: number | null;
}

const StatsBox: React.FC<StatsBoxProps> = ({ current, voltage, powerLimit, currentPower}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <h1>Current: {current}</h1>
      <h1>Voltage: {voltage}</h1>
      <h1>Power Limit: {powerLimit}</h1>
      <h1>Current Power: {currentPower}</h1>
    </div>
  );
}

export default StatsBox