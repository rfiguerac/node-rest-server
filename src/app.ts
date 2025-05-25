import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


(async() => {
    main();
})();

function main() {
    
const server = new Server({
    routes : AppRoutes.routes
});
server.start();
}