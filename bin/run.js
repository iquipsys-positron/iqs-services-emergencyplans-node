let EmergencyPlansProcess = require('../obj/src/container/EmergencyPlansProcess').EmergencyPlansProcess;

try {
    new EmergencyPlansProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
