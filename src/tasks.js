import { v4 as uuidv4 } from "uuid";
export const LISTIFY_TASKS = [
  {
    id: uuidv4(),
    listName: "Todo",
    cards: [
      {
        id: uuidv4(),
        title: "Go for a walk outside 🌳",
        time: new Date(),
      },
      {
        id: uuidv4(),
        title: "Write the daily to-do list 📝",
        time: new Date(),
      },
      {
        id: uuidv4(),
        title: "Schedule meetings for the week 📅",
        time: new Date(),
      },
      {
        id: uuidv4(),
        title: "Read a chapter of a book 📖",
        time: new Date(),
      },
      {
        id: uuidv4(),
        title: "Take a break and relax 🧘‍♀️",
        time: new Date(),
      },
    ],
  },
  {
    id: uuidv4(),
    listName: "Doing",
    cards: [
      {
        id: uuidv4(),
        title: "Check messages and emails 💬",
        time: new Date(),
      },
      {
        id: uuidv4(),
        title: "Review study materials 📚",
        time: new Date(),
      },
      {
        id: uuidv4(),
        title: "Plan tomorrow's meals 🍽️",
        time: new Date(),
      },
    ],
  },
  {
    id: uuidv4(),
    listName: "Done",
    cards: [
      {
        id: uuidv4(),
        title: "Make the bed 🛏️",
        time: new Date(),
      },
      {
        id: uuidv4(),
        title: "Exercise for 30 minutes 🏃‍♂️",
        time: new Date(),
      },
      {
        id: uuidv4(),
        title: "Write a blog post or journal entry 📝",
        time: new Date(),
      },
      {
        id: uuidv4(),
        title: "Clean the living room 🧹",
        time: new Date(),
      },
    ],
  },
];
