
const Banner = () => {
  return (
    <div
      className="w-full bg-slate-500 space-x-3 flex items-center"
    >
      <div className="bg-black bg-opacity-50 p-2 rounded">
        <h1 className="text-3xl font-bold text-white">EVSE Test Software</h1>
      </div>
      <a href="/test" className="text-center">Status<br/>Monitor</a>
      <a href="/canMonitor" className="text-center">CAN<br/>Monitor</a>
      <a href="/modbusConfig">Modbus</a>
    </div>
  );
};

export default Banner;
