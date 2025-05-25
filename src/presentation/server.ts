import  express, { Router } from "express";
import path from "path";


interface Options {
    routes : Router
}
export class Server {

    private app = express();
    private readonly routes : Router;


    constructor(option : Options){
        const { routes } = option;
        this.routes = routes;
    }


    async start() {

        // Middleware
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // public folder
        this.app.use(express.static('public'));


        //* Router
        this.app.use(this.routes);

        //manejador de rutas pas spa
         this.app.get(/.*/, (req, res) => {
             // const indexPath =path.join(__dirname , '../../../public/index.html');
            const indexPath = path.join(process.cwd(), 'public', 'index.html');
            res.sendFile(indexPath);
         })

        this.app.listen(3000, () => {
            console.log('Server running on port 3000');
        })
    };
}