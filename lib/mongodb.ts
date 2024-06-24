import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let _mongoClientPromise: Promise<MongoClient>;

class Singleton {
  private static _instance: Singleton;
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;
  private constructor() {
    this.client = new MongoClient(uri, options);
    this.clientPromise = this.client.connect();

    console.log("Successfully connected to MongoDB");

    if (process.env.NODE_ENV === "development") {
      _mongoClientPromise = this.clientPromise;
    }
  }

  public static get instance() {
    if (!Singleton._instance) {
      Singleton._instance = new Singleton();
    }
    return Singleton._instance.clientPromise;
  }
}

const clientPromise = Singleton.instance;

export default (await clientPromise).db("dotans-project");
