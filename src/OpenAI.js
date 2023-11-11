import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openaiInstance = new OpenAIApi(configuration);

export default openaiInstance;

export const model = "text-davinci-002";
