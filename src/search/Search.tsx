import {useEffect, useState, useReducer} from 'react';
import UserList from './UserList';
import type {User} from './types';
import {useTheme} from './context';

async function fetchUsers(): Promise<User[]> {
  return [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Carol White", email: "carol@example.com" },
    { id: 4, name: "David Brown", email: "david@example.com" },
  ];
}

// Build a component that:
// 1. Fetches and displays users on mount
// 2. Has a search input that filters by name
// 3. Shows a loading state while fetching
// 4. Shows an error state if fetch fails

type State = {
  isLoading: boolean;
  error: null | string;
  users: User[];
}

let initialState: State = {
  isLoading: false,
  error: null,
  users: []
}

type Action = { type: "isLoading"} | {type: "loaded", users: User[]} | {type: "error", errorMessage: string};

function taskReducer(state: State, action: Action): State{
  switch(action.type) {
    case "isLoading": 
     return {
      ... state,
      isLoading: true,
     }
     case "loaded": 
     return {
      ... state,
      isLoading: false,
      error: null,
      users: action.users
     }
     case "error": 
     return {
      ... state,
      isLoading: false,
      error: "error",
      users: []
     }
  }
}

export default function Search() {
  // const [users, setUsers] = useState<User[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string>("");
  const [state, dispatch] = useReducer(taskReducer, initialState);
  console.log("theme - ", useTheme());

  useEffect(()=> {
    const abortController = new AbortController();
    const {signal} = abortController;

    async function loadUsers() {

      try{
        dispatch({type: "isLoading"})
        const list = await fetchUsers();
        dispatch({type: "loaded", users: list,})
      }catch(e: unknown) {
        if(e instanceof  Error && e.name === "AbortError") {console.log("Aborted"); return;}
        dispatch({type: "error", errorMessage: "Error"});
        throw new Error("error");
      }
            
    }
    loadUsers();

    return () => abortController.abort();
  }, []);

  return (
    <>
      {state.isLoading && <p>Loading</p>}
      {state.error && <p>{state.error}</p>}
      {!state.isLoading && !state.error && <UserList users={state.users}/>}
    </>
  );
}