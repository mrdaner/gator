import { setUser, readConfig } from "./config.js"

function main() {
    setUser("Dima");
    const cfg = readConfig();
    console.log(cfg);
}

main();