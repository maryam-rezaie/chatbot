# Reflection Answers

## 1. Building a Chatbot

This project helped me understand that an AI chatbot is more than just an input box. The website has to collect the question, turn the conversation into a messages array, send it to the Cloudflare Worker, and then display the response from OpenAI. The hardest part for me was understanding why the frontend should not contact OpenAI with the API key directly. Once I saw how the Worker acts as a secure middle step, the process made more sense. I also learned how conversation history allows the chatbot to remember information from earlier messages. Adding the loading animation, error message, suggested questions, and responsive layout made the project feel more complete and realistic.

## 2. Talking Points

The qualities I would want to show in an interview are that I am patient, organized, willing to learn, and interested in creating a good user experience. I could explain how I divided this project into smaller pieces instead of trying to finish everything at once. I first built the layout, then added message bubbles, connected the form to JavaScript, and finally sent the conversation through the Cloudflare Worker. After the basic chatbot worked, I added conversation memory, a current-question display, off-topic filtering, and a button for starting a new chat. This story would show that I can test one part at a time, fix problems, and continue improving a project after the main feature is working.

## 3. L'Oréal Recruiter

If I showed this chatbot to a L'Oréal recruiter, I would want them to notice that I tried to make it useful for a real customer instead of only meeting the technical requirement. The split-screen design gives the page a clear L'Oréal identity, while the suggested questions make it easier for someone to begin using the chatbot. I would also want them to notice that it remembers details from the conversation and refuses unrelated questions. The part I would be most interested in receiving feedback on is the recommendation flow. I would like to know what questions the chatbot should ask before suggesting a routine and how a real L'Oréal product database could be connected so the answers stay accurate and up to date.
