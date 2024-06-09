import Chat from "../models/Chat.js";
import { uploadFile } from "../services/google-file-storage.js";
import { UserRoles } from "../utils/enums.js";

export const startChat = async (req, res) => {
  try {
    const { dormId } = req.params;
    const { message } = req.body;
    const chatData = {
      userId: req.userId,
      dormId,
      messages: [
        { message, isManager: req.role === UserRoles.MANAGER ? true : false, isSeen: false }
      ]
    };

    if (req.file) {
      const fileUrl = await uploadFile(req.file, "chat");
      chatData.messages[0].fileUrl = fileUrl;
    }

    const chat = await new Chat(chatData).save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMessageToChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { message } = req.body;
    const messageData = {
      message,
      isManager: req.role === UserRoles.MANAGER ? true : false,
      isSeen: false
    };

    if (req.file) {
      const fileUrl = await uploadFile(req.file, "chat");
      messageData.fileUrl = fileUrl;
    }

    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { messages: messageData } },
      { new: true }
    );
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { role } = req;

    if (!role || (role !== UserRoles.MANAGER && role !== UserRoles.USER)) {
      return res.status(400).json({ message: "Incorrect user's role" });
    }

    const updateFilter =
      role === UserRoles.MANAGER ? { "messages.isManager": false } : { "messages.isManager": true };

    await Chat.updateOne(
      { _id: chatId },
      { $set: { "messages.$[elem].isSeen": true } },
      { arrayFilters: [{ "elem.isManager": !updateFilter["messages.isManager"] }] }
    );

    const chat = await Chat.findById(chatId).populate("dormId").populate("userId");

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllChatsOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({ userId }).populate("dormId");
    if (!chats) {
      return res.status(404).json({ message: "Chats not found" });
    }

    const chatsWithLastMessage = chats.map((chat) => {
      const sortedMessages = chat.messages.sort((a, b) => b.updatedAt - a.updatedAt);
      return { ...chat.toObject(), lastMessage: sortedMessages[0].message };
    });

    res.json(chatsWithLastMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllChatsOfManager = async (req, res) => {
  try {
    const { dormId } = req.params;
    const chats = await Chat.find({ dormId }).populate("userId");
    if (!chats) {
      return res.status(404).json({ message: "Chats not found" });
    }

    const chatsWithLastMessage = chats.map((chat) => {
      const sortedMessages = chat.messages.sort((a, b) => b.updatedAt - a.updatedAt);
      return { ...chat.toObject(), lastMessage: sortedMessages[0].message };
    });

    res.json(chatsWithLastMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
