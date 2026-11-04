import {useState} from "react";

// Build a form with:

// Name (required, min 2 characters)
// Email (required, must contain @)
// Password (required, min 8 characters)
// Submit button (disabled if any errors)
// Show inline error messages per field

export default function Form() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [nameError, setNameError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    return (
        <div className="form">
            <form>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={(e) => {
                    const val = e.target.value;
                    setNameError(val.length < 2)
                }}/>
                {nameError && <p>Name should be atleast 2 characters</p>}
                <br/>

                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={(e) => {
                    const val = e.target.value;
                    setEmailError(!val.includes("@"))
                }}/>
                {emailError && <p>Email should include @.</p>}
                <br/>

                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={(e) => {
                    const val = e.target.value;
                    setPasswordError(val.length < 8)
                }}/>
                {passwordError && <p>Password should be minimum 8 characters.</p>}
                <br/>

                <button type="submit" disabled={nameError || emailError || passwordError || !name || !email || !password}>Submit</button>
            </form>
        </div>
    );
}


// onBlur for each input, calculate the error and display it