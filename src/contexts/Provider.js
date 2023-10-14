import { createContext, useState } from "react";
import useFetch from "../hooks/useFetch";

export const DataContext = createContext();

const Provider = ({ children }) => {
  const { data, loading, apiError } = useFetch();
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
