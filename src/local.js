import app from "./app.js";
import { log } from "./utils/logger.js";
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    log(`[DEV] Servidor escuchando en http://localhost:${PORT}`);
});

