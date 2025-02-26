interface StatsBoxProps {
  current: number | null;
}

const StatsBox: React.FC<StatsBoxProps> = ({ current }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <h1>Current: </h1>
      <h1>Voltage: </h1>
      <h1>Power Limit: </h1>
      <h1>Current Power: </h1>
    </div>
  );
}

export default StatsBox