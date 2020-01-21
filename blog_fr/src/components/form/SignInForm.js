import React,{useState} from "react";

function SignInForm(props) {
    const[email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleEmailChange=(evt)=>{
        setEmail(evt.target.value)
    }

    const handlePasswordChange=(evt)=>{
        setPassword(evt.target.value)
    }

    const handleSubmit= (evt) => {
        evt.preventDefault()

            fetch(`http://localhost:3000/auth_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(resp => resp.json())
            .then(data => {
                localStorage.setItem("id",data.user.id)
                localStorage.setItem("token", data.auth_token)
                props.handleLogin(data.user)
            })

    }

    const formDivStyle={
        margin:"auto",
        padding:"20px",
        width:"80%"
    }

    return(
        <div style={formDivStyle}>
            <h1>Sign Up</h1>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Username</label>
                    <input value={email} onChange={handleEmailChange} type="text" placeholder="email"/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
                </div>

                <button className="ul button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignInForm