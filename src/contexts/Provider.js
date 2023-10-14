import { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";

export const DataContext = createContext();

const Provider = ({ children }) => {
  const { data, loading, apiError } = useFetch();
//   const data = {
//       tickets: [
//         {
//           id: "CAM-1",
//           title: "Update User Profile Page UI",
//           tag: ["Feature request"],
//           userId: "usr-1",
//           status: "Todo",
//           priority: 4,
//         },
//         {
//           id: "CAM-2",
//           title:
//             "Add Multi-Language Support - Enable multi-language support within the application.",
//           tag: ["Feature Request"],
//           userId: "usr-2",
//           status: "In progress",
//           priority: 3,
//         },
//         {
//           id: "CAM-3",
//           title: "Optimize Database Queries for Performance",
//           tag: ["Feature Request"],
//           userId: "usr-2",
//           status: "In progress",
//           priority: 1,
//         },
//         {
//           id: "CAM-4",
//           title: "Implement Email Notification System",
//           tag: ["Feature Request"],
//           userId: "usr-1",
//           status: "In progress",
//           priority: 3,
//         },
//         {
//           id: "CAM-5",
//           title: "Enhance Search Functionality",
//           tag: ["Feature Request"],
//           userId: "usr-5",
//           status: "In progress",
//           priority: 0,
//         },
//         {
//           id: "CAM-6",
//           title: "Third-Party Payment Gateway",
//           tag: ["Feature Request"],
//           userId: "usr-2",
//           status: "Todo",
//           priority: 1,
//         },
//         {
//           id: "CAM-7",
//           title: "Create Onboarding Tutorial for New Users",
//           tag: ["Feature Request"],
//           userId: "usr-1",
//           status: "Backlog",
//           priority: 2,
//         },
//         {
//           id: "CAM-8",
//           title: "Implement Role-Based Access Control (RBAC)",
//           tag: ["Feature Request"],
//           userId: "usr-3",
//           status: "In progress",
//           priority: 3,
//         },
//         {
//           id: "CAM-9",
//           title: "Upgrade Server Infrastructure",
//           tag: ["Feature Request"],
//           userId: "usr-5",
//           status: "Todo",
//           priority: 2,
//         },
//         {
//           id: "CAM-10",
//           title: "Conduct Security Vulnerability Assessment",
//           tag: ["Feature Request"],
//           userId: "usr-4",
//           status: "Backlog",
//           priority: 1,
//         },
//       ],
//       users: [
//         {
//           id: "usr-1",
//           name: "Anoop sharma",
//           available: false,
//         },
//         {
//           id: "usr-2",
//           name: "Yogesh",
//           available: true,
//         },
//         {
//           id: "usr-3",
//           name: "Shankar Kumar",
//           available: true,
//         },
//         {
//           id: "usr-4",
//           name: "Ramesh",
//           available: true,
//         },
//         {
//           id: "usr-5",
//           name: "Suresh",
//           available: true,
//         },
//       ],
//     },
//     loading = false,
//     apiError = null;

  //used for select option
  const [selectOption, setSelectOption] = useState(0);
  const [sortOption, setSortOption] = useState(0);
  const onChangeHandler = (e) => {
    setSelectOption(e.target.value);
  };
  const onOptionChangeHandler = (e) => {
    console.log("change", e.target.value);
    setSortOption(e.target.value);
  };
  const users = loading ? [] : data.users;
  const tickets = loading ? [] : data.tickets;

  const mapOfIds = {};
  const ticketsByUserId = {}; //{'user-id': [],''user-id': []}
  const ticketsByStatus = {};
  const ticketsByPriortity = {};

  users.forEach((user) => {
    mapOfIds[user.id] = user.name;
  });

  tickets.forEach((ticket) => {
    ticket["user"] = mapOfIds[ticket.userId];
    //also making group by userid
    const { userId } = ticket;
    const { status } = ticket;
    const { priority } = ticket;
    if (!ticketsByUserId[userId]) {
      ticketsByUserId[userId] = [];
    }

    ticketsByUserId[userId].push(ticket);

    //according to status
    if (!ticketsByStatus[status]) {
      ticketsByStatus[status] = [];
    }

    ticketsByStatus[status].push(ticket);

    //according to priority
    if (!ticketsByPriortity[priority]) {
      ticketsByPriortity[priority] = [];
    }

    ticketsByPriortity[priority].push(ticket);
  });

  
  return (
    <DataContext.Provider
      value={{
        tickets: [ticketsByUserId, ticketsByStatus, ticketsByPriortity],
        loading,
        apiError,
        selectOption,
        onChangeHandler,
        sortOption,
        onOptionChangeHandler,
        mapOfIds
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default Provider;
