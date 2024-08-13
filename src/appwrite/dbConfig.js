// dbConfig.js
import conf from '../conf'
import { Client, Databases, Query } from 'appwrite'

export class DBService {
    client = new Client()
    databases

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async createNewChat({ id, title, content, userId }) {
        try {
            let serializedContent;
            if (typeof content == "array" || "object") {

                serializedContent = JSON.stringify(content);
            }
            serializedContent = content
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    id,
                    title,
                    content: serializedContent,
                    userId,
                }
            )
        } catch (error) {
            return ("Appwrite databaseService error in createNewChat: " + error)
        }
    }

    async sendMsg(id, { content }) {
        try {
            let serializedContent;
            if (typeof content == "array" || "object") {

                serializedContent = JSON.stringify(content);
            }
            serializedContent = content
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    content: serializedContent,
                }
            )
        } catch (error) {
            return ("Appwrite databaseService error in sendMsg: " + error)
        }
    }

    async deleteChat(id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
            )
            return true
        } catch (error) {
            return ("Appwrite databaseService error in deleteChat: " + error)
        }
    }

    async getChats(userId) {
        const queries = [Query.equal("userId", userId)]
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            return ("Appwrite databaseService error in getChats: " + error)
        }
    }
}

const dbService = new DBService()
export default dbService
