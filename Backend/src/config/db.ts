import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("La variable d'environnement MONGO_URI n'est pas définie dans le fichier .env");
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB connecté: ${conn.connection.host}`);
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Erreur de connexion MongoDB: ${error.message}`);
    } else {
      console.error(`Erreur inattendue lors de la connexion à MongoDB:`, error);
    }
    
    process.exit(1);
  }
};

export default connectDB;