import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

 const account = new Account(client);

 export {account,ID}




