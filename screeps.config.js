import config from "./screeps-multimeter.json";

export default {
  main: {
    token: config.token,
    protocol: "https",
    hostname: "screeps.com",
    port: 443,
    path: "/",
    branch: "default"
  },
  sim: {
    token: config.token,
    protocol: "https",
    hostname: "screeps.com",
    port: 443,
    path: "/",
    branch: "sim"
  },
  pserver: {
    email: "username",
    password: "Password",
    protocol: "http",
    hostname: "1.2.3.4",
    port: 21025,
    path: "/",
    branch: "main"
  }
};
