import { useEffect, useMemo, useState } from "react";

type User = {
    id: number,
    name: string,
    email: string;
}

type Status = "isLoading" | "loaded" | "error";

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

export default function SearchOneComp() {
    const [userList, setUserList] = useState<User[]>([]);
    const [status, setStatus] = useState<Status>("isLoading");

    useEffect(()=> {
        async function loadUsers() {
            try{
                const userList = await fetchUsers();
                setUserList(userList);
                setStatus("loaded");
            } catch(e: unknown) {
                setStatus("error");
            }
        }
        loadUsers();
    }, []);

    return (
        <div className="contents">
            {status === "isLoading" && <p>Data Loading</p>}
            {status === "error" && <p>Error</p>}
            {status === "loaded" && <UserList users={userList}/>}
        </div>
    );
}

export function UserList({users}: {users: User[]}) {
    const [query, setQuery] = useState<string>("");
    const debouncedQuery = useDebounce({query, waitTime: 400})
    const filteredList = useMemo(() => users.filter((u) => u.name.toLowerCase().includes(debouncedQuery.toLocaleLowerCase())), [users, debouncedQuery]);

    return(
        <div className="contents">
            <input value={query} type="text" name="" className="border" onChange={(e) => setQuery(e.target.value)}/>
            <br/>
            <ul className="border">
                {filteredList.map((u) => (<li key={u.id} className="">{u.name}</li>))}
            </ul>
        </div>
    );    
}

function useDebounce({query, waitTime}: {query: string, waitTime: number}){
    const [debouncedQuery, setDebouncedQuery] = useState<string>(query)
    useEffect(() => {
        const timeoutId = setTimeout(function() {
            setDebouncedQuery(query);
        }, waitTime);

        return () => clearTimeout(timeoutId);

    }, [query, waitTime]);

    return debouncedQuery;
}

// fetch and save users in the userList in search component, add error and loading states
// in userlist, add a useState for saving the query