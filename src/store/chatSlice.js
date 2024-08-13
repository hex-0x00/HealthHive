import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    chats: {
        documents: []
    },
    globalInput: null
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChats: (state, action) => {
            state.chats.documents = Array.isArray(action.payload) ? action.payload : [];
        },
        addMessage: (state, action) => {
            const { chatId, message, userId } = action.payload;
            let chat = state.chats.documents.find(chat => chat.id === chatId);

            if (!chat) {
                chat = { id: chatId, title: "New Chat", content: "[]", userId };
                state.chats.documents.push(chat);
            }

            let chatContent = JSON.parse(chat.content);
            chatContent.push(message);
            chat.content = JSON.stringify(chatContent);
        },
        updateChatTitle: (state, action) => {
            const { chatId, title } = action.payload;
            const chat = state.chats.documents.find(chat => chat.id === chatId);
            if (chat) {
                chat.title = title;
            }
        },
        setGlobalInput: (state, action) => {
            state.globalInput = action.payload;
        },
        resetGlobalInput: (state) => {
            state.globalInput = null;
        },
    }
});

export const { setChats, addMessage, updateChatTitle, setGlobalInput, resetGlobalInput } = chatSlice.actions;
export default chatSlice.reducer