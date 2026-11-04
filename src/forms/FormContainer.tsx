import { useState } from "react";
import InputWithLabel from "./InputWithLabel";

export default function FormContainer() {
    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");

    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");

    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    return (
        <form>
            <InputWithLabel
                id="name"
                name="name"
                value={name}
                type="text"
                error={nameError}
                label="Name"
                onChange={(val: string) => setName(val)}
                onBlur={(val: string) => {
                    if(val.length < 2) setNameError("name should have atleast 2 characters");
                    else setNameError("")
                }}
            />

            <InputWithLabel
                id="email"
                name="email"
                value={email}
                type="text"
                error={emailError}
                label="Email"
                onChange={(val: string) => setEmail(val)}
                onBlur={(val: string) => {
                    if(!val.includes("@")) setEmailError("email should have @");
                    else setEmailError("")
                }}
            />

            <InputWithLabel
                id="password"
                name="password"
                value={password}
                type="password"
                error={passwordError}
                label="Password"
                onChange={(val: string) => setPassword(val)}
                onBlur={(val: string) => {
                    if(val.length < 8) setPasswordError("Password should have be atleast 8 chars");
                    else setPasswordError("")
                }}
            />
            
            <button type="submit" disabled={!!nameError || !!emailError || !!passwordError || !name || !email || !password}>Submit</button>
        </form>
    );
}