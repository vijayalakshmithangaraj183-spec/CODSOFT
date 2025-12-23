function sendMessage() 
{
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    const chatBox = document.getElementById("chatBox");

    if (message === "") return;

   
    const userMsg = document.createElement("div");
    userMsg.className = "user-message";
    userMsg.innerText = message;
    chatBox.appendChild(userMsg);
    
    const botReply = getBotResponse(message);

    const botMsg = document.createElement("div");
    botMsg.className = "bot-message";
    botMsg.innerText = botReply;
    chatBox.appendChild(botMsg);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(input) 
{
    input = input.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) 
    {
        return "Hello! How can I help you?";
    }
    else if (input.includes("how are you")) 
    {
        return "I'm doing great! 😊";
    }
    else if (input.includes("your name"))
    {
        return "I am a rule-based chatbot.";
    }
    else if (input.includes(" I want help") || input.includes("help"))
    {
        return "I can answer simple questions like greetings.";
    }
    else if (input.includes("bye") || input.includes("exit")) 
    {
        return "Goodbye! Have a nice day 👋";
    }
    else 
    {
        return "Sorry, I didn't understand that.";
    }
}
