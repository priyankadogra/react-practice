import type {User} from './types';
import {useState, useMemo} from 'react';
import {useDebounce} from './utils';

export default function UserList({users}: {users: User[]}) {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 300);
  const filteredUsers = useMemo(() => users.filter((u: User) => u.name.toLowerCase().includes(debouncedQuery.toLowerCase())), [debouncedQuery, users])  

  function filterList(val: string){
    setQuery(val);
  }

  return (
    <div className="">
      <input type="text" name="query" className="border" value={query} onChange={(e) => {
        filterList(e.target.value);
      }}/>

      <ul className="border">
        {filteredUsers.map((u:User) => (<li className="" key={u.id}>{u.name}</li>))}
      </ul>
    </div>
  );
}