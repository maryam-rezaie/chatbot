/* -------------------------------------------------
   Paste the deployed Cloudflare Worker URL here.
   Never place an OpenAI API key in this public file.
-------------------------------------------------- */
const WORKER_URL = "https://asal.mr2075.workers.dev/";

/* Find the HTML elements that JavaScript needs to update. */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const clearChatBtn = document.getElementById("clearChatBtn");
const chatWindow = document.getElementById("chatWindow");
const latestQuestion = document.getElementById("latestQuestion");
const latestQuestionText = document.getElementById("latestQuestionText");
const suggestionButtons = document.querySelectorAll(".suggestion");
const currentYear = document.getElementById("currentYear");

/*
  This array saves user and assistant messages during the current chat.
  Sending the array with every request gives the chatbot conversation memory.
*/
let conversationHistory = [];

currentYear.textContent = new Date().getFullYear();
showWelcomeMessage();

/* Add the first assistant message shown when the page opens. */
function showWelcomeMessage() {
  addMessage(
    "assistant",
    "Hello! I’m your L'Oréal Beauty Concierge. Tell me about your skin type, hair type, favorite products, or the kind of routine you want to create."
  );
}

/* Create and display one user or assistant message bubble. */
function addMessage(role, message, options = {}) {
  const row = document.createElement("div");
  row.className = `message-row ${role}`;

  if (options.isError) {
    row.classList.add("error");
  }

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = role === "user" ? "YOU" : "L";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";

  const label = document.createElement("span");
  label.className = "message-label";
  label.textContent = role === "user" ? "You" : "Beauty Concierge";

  const text = document.createElement("span");
  text.textContent = message;

  bubble.append(label, text);
  row.append(avatar, bubble);
  chatWindow.appendChild(row);

  /* Keep the newest message visible. */
  chatWindow.scrollTop = chatWindow.scrollHeight;

  return row;
}

/* Display an animated bubble while waiting for OpenAI. */
function addTypingIndicator() {
  const row = document.createElement("div");
  row.className = "message-row assistant";
  row.id = "typingIndicator";

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = "L";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.setAttribute("aria-label", "The Beauty Concierge is typing");

  const label = document.createElement("span");
  label.className = "message-label";
  label.textContent = "Beauty Concierge";

  const dots = document.createElement("span");
  dots.className = "typing-dots";
  dots.innerHTML = "<span></span><span></span><span></span>";

  bubble.append(label, dots);
  row.append(avatar, bubble);
  chatWindow.appendChild(row);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  return row;
}

/* Disable controls while a request is in progress. */
function setLoading(isLoading) {
  userInput.disabled = isLoading;
  sendBtn.disabled = isLoading;
  clearChatBtn.disabled = isLoading;

  suggestionButtons.forEach((button) => {
    button.disabled = isLoading;
  });
}

/* Show only the newest question in the separate question box. */
function updateLatestQuestion(question) {
  latestQuestionText.textContent = question;
  latestQuestion.hidden = false;
}

/* Send the saved conversation to the Cloudflare Worker. */
async function requestAssistantReply() {
  if (WORKER_URL.includes("PASTE_YOUR")) {
    throw new Error(
      "Setup is incomplete. Paste the deployed Cloudflare Worker URL at the top of script.js."
    );
  }

  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      /* Keep the request small by sending only the newest 24 messages. */
      messages: conversationHistory.slice(-24),
    }),
  });

  let data;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error("The Worker returned a response that could not be read.");
  }

  if (!response.ok) {
    const errorMessage =
      data?.error?.message || data?.error || "The Worker request failed.";
    throw new Error(errorMessage);
  }

  const reply = data?.choices?.[0]?.message?.content;

  if (!reply) {
    throw new Error("The chatbot returned an empty response. Please try again.");
  }

  return reply.trim();
}

/* Handle a question submitted through the form. */
chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const question = userInput.value.trim();

  if (!question) {
    return;
  }

  updateLatestQuestion(question);
  addMessage("user", question);
  conversationHistory.push({ role: "user", content: question });

  userInput.value = "";
  setLoading(true);
  const typingIndicator = addTypingIndicator();

  try {
    const reply = await requestAssistantReply();

    typingIndicator.remove();
    addMessage("assistant", reply);
    conversationHistory.push({ role: "assistant", content: reply });
  } catch (error) {
    typingIndicator.remove();
    addMessage(
      "assistant",
      `Sorry, I could not complete that request. ${error.message}`,
      { isError: true }
    );
  } finally {
    setLoading(false);
    userInput.focus();
  }
});

/* Suggested prompts are copied into the input and submitted automatically. */
suggestionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    userInput.value = button.textContent.trim();
    chatForm.requestSubmit();
  });
});

/* Start a new conversation without reloading the whole page. */
clearChatBtn.addEventListener("click", () => {
  conversationHistory = [];
  chatWindow.innerHTML = "";
  latestQuestion.hidden = true;
  latestQuestionText.textContent = "";
  userInput.value = "";
  showWelcomeMessage();
  userInput.focus();
});
