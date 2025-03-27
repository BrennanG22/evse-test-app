import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MODBUS_SERVER: 'http://localhost:2000',
    SECC_SERVER: 'http://localhost:3000',
    WEBSOCKET_URL: 'ws://10.20.27.100/api/outlets/ccs/statestream',
    API_CONFIG_PATH: 'C:/Users/jbrgi/Code/evse-test-app/config/apiConfig.txt'
  }
};

export default nextConfig;
