const input = document.querySelector("#usernameInput")
const subBtn = document.querySelector(".signUpButton")
const label = document.querySelector(".inputLabel")

const url = "https://mkmiddleman.onrender.com/newUser"

const fetchToExpressServer = async(username)=>{
    const headers = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: username
        })
    }
    const response = await fetch(url, headers)
    const result = response.json()
    return result
}

const isSignedUp = JSON.parse(localStorage.getItem("SignedUpForMarioKart"))
if(isSignedUp){
    input.disabled = true
    subBtn.disabled = true
    input.placeholder = "Thanks for signing up!"
    label.innerText = "You're allready signed up!"
}

subBtn.addEventListener("click", async ()=>{
    if (input.value < 1 || input.value > 10){
        label.innerText = "Please choose a name shorter than 10."
        return
    }
    const dataInput = input.value
    input.value = "";
    input.disabled = true;
    label.innerText = "Saving Username, please wait!"
    const data = await fetchToExpressServer(dataInput)
    if (data.message){
        label.innerText = data.message
        input.placeholder = "Thanks for Signing up!"
        subBtn.disabled = true
        localStorage.setItem("SignedUpForMarioKart", JSON.stringify(true))
    } else{
        input.disabled = false;
        label.innerText = "Please try again."
    }

    console.log(data)
})