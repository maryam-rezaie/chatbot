# L'Oréal Beauty Concierge

This is an alternate implementation of the L'Oréal chatbot project. It uses a split-screen layout, conversation bubbles, suggested questions, conversation memory, and a secure Cloudflare Worker.

## Project files

- `index.html` — page structure and accessible chat interface
- `style.css` — responsive L'Oréal-inspired split-screen design
- `script.js` — user interaction, chat history, API requests, and new-chat behavior
- `RESOURCE_cloudflare-worker.js` — secure Worker code and system prompt
- `REFLECTIONS.md` — three student-style assignment reflections
- `img/loreal-logo.png` — the logo supplied with the starter project

## Security warning

Never place an OpenAI API key in `script.js`, `index.html`, GitHub, or any other frontend file. The key should only be stored as a Cloudflare Worker secret named `OPENAI_API_KEY`.

## Setup instructions

### 1. Add the logo

Keep the supplied logo at this exact path:

```text
img/loreal-logo.png
```

### 2. Create the Cloudflare Worker

1. Open the Cloudflare dashboard.
2. Go to **Workers & Pages**.
3. Create a new Worker.
4. Replace its code with everything in `RESOURCE_cloudflare-worker.js`.
5. Open the Worker's **Settings**.
6. Find **Variables and Secrets**.
7. Add a secret named `OPENAI_API_KEY`.
8. Paste the API key as the value and save it.
9. Deploy the Worker.
10. Copy the Worker URL.

### 3. Connect the website

At the top of `script.js`, replace:

```js
const WORKER_URL = "PASTE_YOUR_CLOUDFLARE_WORKER_URL_HERE";
```

with the deployed URL, such as:

```js
const WORKER_URL = "https://your-worker-name.your-subdomain.workers.dev/";
```

## Rubric coverage

- L'Oréal logo and branded visual design
- User input captured and sent to OpenAI through Cloudflare
- Assistant responses shown in the page
- System prompt limits answers to L'Oréal and beauty topics
- API key stored securely in a Worker secret
- Conversation history maintained for multi-turn context
- Latest user question displayed separately
- Different user and assistant chat bubbles
- Loading indicator, error messages, suggested prompts, and new-chat button
- Responsive mobile and desktop layout

## Tests to run

1. `What L'Oréal products could I use for a simple dry-skin routine?`
2. `My name is Jordan and I have curly, frizzy hair.`
3. `What name and hair concern did I tell you?`
4. `Can you help me write a history essay?`
5. `What is the difference between a serum and a moisturizer?`

The fourth question should receive a polite off-topic refusal.

Before submitting, also test the send button, Enter key, suggested questions, new-chat button, mobile layout, and live site in an incognito browser.
