import  express from "express";
import path from "path";

export class Server {

    private app = express();


    async start() {

        // Middleware

        // public folder
        this.app.use(express.static('public'));

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