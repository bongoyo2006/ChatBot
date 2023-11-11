import { useState, useRef, useCallback } from "react";
import openaiInstance, { model } from "./OpenAI";
import { List } from "antd";

import "./styles.css";

export default function App() {
  const [conversation, setConversation] = useState([]);

  // Use this to store the current data to avoid re-painting.
  const messageRef = useRef("");
  const onSubmit = (event) => {
    talkToAI(messageRef.current.value);
    event.preventDefault();
    messageRef.current.value = "";
  };

  const talkToAI = useCallback(
    async (text) => {
      // Insert message at first element.
      conversation.unshift(text);
      setConversation([...conversation]);
      const response = await openaiInstance.createCompletion({
        model: model,
        prompt: text
      });
      console.log(response.data);
      // Append AI message.
      setConversation((currentConversation) => [
        response.data.choices[0].text,
        ...currentConversation
      ]);
    },
    [conversation]
  );

  return (
    <div className="App">
      <h1>GPT AI Chat by Said</h1>

      <>
        <form onSubmit={onSubmit}>
          Your message : <input ref={messageRef} type="text" />
          <input type="submit" />
        </form>
        <List
          dataSource={conversation}
          renderItem={(msg, index) => (
            <List.Item
              style={{
                textAlign:
                  (conversation.length - index + 1) % 2 === 0 ? "left" : "right"
              }}
            >
              {(conversation.length - index + 1) % 2 === 0 ? (
                <>
                  <p>You:{msg}</p>
                  <br />
                </>
              ) : (
                <>
                  <p>AI:{msg}</p>
                  <br />
                </>
              )}
            </List.Item>
          )}
        />
        {/* {conversation.map((msg, index) => {
          if ((conversation.length - index + 1) % 2 === 0)
            return (
              <>
                <p>You:{msg}</p>
                <br />
              </>
            );
          else {
            return (
              <>
                <p>AI:{msg}</p>
                <br />
              </>
            );
          }
        })} */}
      </>
    </div>
  );
}
