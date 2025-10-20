import { exec } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const createDbCmd = `mysql -u ${DB_USER} -p${DB_PASSWORD} -h ${DB_HOST} -e "CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;"`;

exec(createDbCmd, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error creating database: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`MySQL stderr: ${stderr}`);
    }

    console.log(`Database ${DB_NAME} is ready.`);

    // Now run schema.sql
    const importCmd = `mysql -u ${DB_USER} -p${DB_PASSWORD} -h ${DB_HOST} ${DB_NAME} < schema.sql`;

    exec(importCmd, (error2, stdout2, stderr2) => {
        if (error2) {
            console.error(`Error importing schema: ${error2.message}`);
            return;
        }
        if (stderr2) {
            console.error(`MySQL stderr: ${stderr2}`);
        }
        console.log("Schema imported successfully.");
    });
});
