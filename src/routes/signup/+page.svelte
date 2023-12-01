<script lang="ts" context="module">
	import PasswordFC from "./../../lib/comp/signup/flowContent/PasswordFC.svelte";
	import VerifFC from "./../../lib/comp/signup/flowContent/VerifFC.svelte";
	import EmailFC from "./../../lib/comp/signup/flowContent/EmailFC.svelte";
	import HandleFC from "./../../lib/comp/signup/flowContent/HandleFC.svelte";
	import NameFC from "./../../lib/comp/signup/flowContent/NameFC.svelte";
	import IntroFC from "./../../lib/comp/signup/flowContent/IntroFC.svelte";
	import VerificationInput from "./../../lib/comp/ui/inputs/VerificationInput.svelte";
	import { API_HOST } from "$lib/@const/dynamic.env";

    export interface uniqueSignupProcessStatus {
        state: null | "checking" | "success" | "failed",
        message: string,
    }

    const handleValid = async (handle: string): Promise<[boolean, string]> => { // returns an error message or null for success
        // check handle validity first
        if(handle.length < 1 || handle.length > 15) {
            return [false, "Your handle's length must be between 1 and 15 characters."];
        }
        if(/^[0-9]$/.test(handle[0])){
            return [false, "Your handle cannot begin with a number."];
        }
        if(!/^[a-zA-Z0-9_]+$/.test(handle)) {
            return [false, "Your handle must only contain letters, numbers, and underscores."];
        }

        // check if handle exists on the server
        const response = await fetch(`${API_HOST}/user/check-exists`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                handle: handle
            })
        });

        const handleExists = await response.json();

        if(handleExists){
            return [false, "This handle has already been taken. Try another one."];
        }
        
        return [true, "Looks Good!"];
    }

    const emailValid = async (email: string): Promise<[boolean, string]> => { // returns an error message or null for success
        // check email validity first
        if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
            return [false, "Please enter a valid email address."];
        }

        // check if handle exists on the server
        const response = await fetch(`${API_HOST}/user/check-exists`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        });

        const emailExists = await response.json();

        if(emailExists){
            return [false, "This email is already in use. Try another one."];
        }
        
        return [true, "Looks Good!"];
    }

    const sendVerificationEmail = async (email: string, name: string): Promise<void> => { // returns verification code
        // send a simple get request to the server with the name and the email
        await fetch(`${API_HOST}/auth/get-email-code`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: name
            })
        });
    }

    const codeValid = async (code: string, email: string): Promise<[boolean, string]> => { // returns an error message or null for success
        // send code along with email to verify the email
        const response = await fetch(`${API_HOST}/auth/verify-email-code`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                code: code
            })
        });

        // if the response is not ok, it's most likely a 403 and means the code was wrong
        if(!response.ok){
            return [false, "Incorrect verification code."];
        }

        // assuming the code was correct, store the returned JWT in the cookie as a temporary signup token
        const body = await response.json();
        const accessToken = body.access_token;

        // store access token as a session cookie
        Cookies.set("signup_token", accessToken);
        
        return [true, "Looks Good!"];
    }
</script>

<script lang="ts">
	import LoadingSpinner from "$lib/comp/ui/general/LoadingSpinner.svelte";
	import Cookies from "js-cookie";

    let navContainer: HTMLElement;
    let navStep = 4; // DEBUG:
    
    let nameValue: string = "Lemon"; // DEBUG:
    let nameField: HTMLInputElement;
    
    let handleValue: string = "lemon"; // DEBUG:
    let handleField: HTMLInputElement;
    
    let emailValue: string = "reallemonorange@gmail.com"; // DEBUG:
    let lastEmail: string = "";
    let emailField: HTMLInputElement;

    let verifCode: string; // DEBUG:
    let verifField: HTMLInputElement;
    
    let passwordValue: string;
    let passwordField: HTMLInputElement;

    let leftClickable: boolean;
    let rightClickable: boolean;

    // nav position : height
    const navButtonHeight: Record<number, number> = {
        0: 80, // intro
        1: 104, // name
        2: 104, // handle
        3: 104, // email
        4: 124, // verification
        5: 300, // password
    }
    // UI variables
    $: navHeight = navButtonHeight[navStep] ?? navButtonHeight[Object.keys(navButtonHeight).length - 1];
    
    // nav position : action
    const navButtonActions: Record<number, (()=>void) | null> = {
        0: null, // no action for the intro
        1: () => {
            if(nameField) nameField.focus();
        },
        2: () => {
            if(handleField) handleField.focus();
        },
        3: () => {
            if(emailField) emailField.focus();
        },
        4: () => {
            // if the valid email is now different from the original one, send a verification email
            if(lastEmail !== emailValue){
                lastEmail = emailValue; // update last email
                verifCodeStatus.state = null; // reset verification status to null
                verifCode = ""; // reset verification code

                sendVerificationEmail(lastEmail, nameValue);
                cooldownResend(); // start a cooldown for the verification code
            }
            // focus the field
            if(verifField) verifField.focus();
        },
        5: () => {
            if(passwordField) passwordField.focus();
        }
    }

    // nav position : (left disabled condition, right disabled condition)
    let navButtonDisabledCondition: Record<number, [boolean, boolean]>;
    $: navButtonDisabledCondition = { 
        0: [false, true],  // disabled (not clickable), normal (clickable)
        1: [true, !!nameValue], // name
        2: [true, handleStatus.state === "success"], // handle
        3: [true, emailStatus.state === "success"], // email
        // 4: [verifCodeStatus.state !== "success", verifCodeStatus.state === "success"], // verification
        4: [false, true], // verification
        5: [false, true] // verification
    }
    // UI variables
    $: leftClickable = !navButtonDisabledCondition[navStep] ? true : navButtonDisabledCondition[navStep][0]
    $: rightClickable = !navButtonDisabledCondition[navStep] ? true : navButtonDisabledCondition[navStep][1]
    
    const navRight = () => {
        navStep++;
        
        // run navButtonActions
        const navAction = navButtonActions[navStep];
        if(!!navAction) navAction();
    }
    const navLeft = () => {
        navStep--;
        navStep = Math.max(navStep, 0); // clip to 0

        // run navButtonActions
        const navAction = navButtonActions[navStep];
        if(!!navAction) navAction();
    }

    let handleStatus: uniqueSignupProcessStatus = {  state: null, message: "" };
    let emailStatus: uniqueSignupProcessStatus = {  state: null, message: "" };
    let verifCodeStatus: uniqueSignupProcessStatus = {  state: null, message: "" };

    let checkTimeout: ReturnType<typeof setTimeout>;
    const checkHandleAvailablility = () => {
        handleStatus.state = "checking";
        clearTimeout(checkTimeout); // clear the previous timeout
        
        checkTimeout = setTimeout(async () => { // check if handle is available after 1000ms of delay
            const [valid, message] = await handleValid(handleField.value);
            
            if(valid) handleStatus.state = "success";
            else handleStatus.state = "failed";

            handleStatus.message = message;
        }, 1000);
    }

    const checkEmailAvailablility = () => {
        emailStatus.state = "checking";
        clearTimeout(checkTimeout); // clear the previous timeout
        
        checkTimeout = setTimeout(async () => { // check if handle is available after 1000ms of delay
            const email = emailField.value;
            const [valid, message] = await emailValid(email);
            
            // set email status to success and store the valid email
            if(valid) {
                emailStatus.state = "success";
            }
            else emailStatus.state = "failed";

            emailStatus.message = message;
        }, 1000);
    }

    const checkVerificationCode = () => {
        verifCodeStatus.state = "checking";
        clearTimeout(checkTimeout); // clear the previous timeout
        
        checkTimeout = setTimeout(async () => { // check if handle is available after 1000ms of delay
            const [valid, message] = await codeValid(verifField.value, emailField.value);
            
            if(valid) {
                verifCodeStatus.state = "success"
            } else{
                verifCode = ""; // reset verification code
                verifCodeStatus.state = "failed";
            }

            verifCodeStatus.message = message;
        }, 1000);
    }

    let resendCooldownInterval: ReturnType<typeof setInterval>;
    let resendCooldownTime: number = 0;
    const cooldownResend = () => {
        clearInterval(resendCooldownInterval);
        resendCooldownTime = 30; // reset back to 30 seconds
        
        resendCooldownInterval = setInterval(() => {
            resendCooldownTime--;
            if(resendCooldownTime === 0) clearInterval(resendCooldownInterval);
        }, 1000);
    }
    const resendVerificationCode = () => {
        sendVerificationEmail(emailField.value, nameValue);
        cooldownResend();
    }
</script>

<main>
    <section id="flow-content-container">
        <section id="intro" class="flow-content {navStep === 0 ? "visible" : ""} {navStep > 0 ? "left" : "right"}">
            <IntroFC/>
        </section>
    
        <section id="name" class="flow-content {navStep === 1 ? "visible" : ""} {navStep > 1 ? "left" : "right"}">
            <NameFC
                bind:input={nameField}
                bind:value={nameValue}
            />
        </section>
    
        <!-- Form fields -->
        <section id="handle" class="flow-content {navStep === 2 ? "visible" : ""} {navStep > 2 ? "left" : "right"}">
            <HandleFC
                nameValue={nameValue}
                status={handleStatus}
                bind:input={handleField}
                bind:value={handleValue}
                on:input={checkHandleAvailablility}
            />
        </section>
    
        <section id="email" class="flow-content {navStep === 3 ? "visible" : ""} {navStep > 3 ? "left" : "right"}">
            <EmailFC
                status={emailStatus}
                bind:input={emailField}
                bind:value={emailValue}
                on:input={checkEmailAvailablility}
            />
        </section>

        <section id="verfication" class="flow-content {navStep === 4 ? "visible" : ""} {navStep > 4 ? "left" : "right"}">
            <VerifFC
                nameValue={nameValue}
                status={verifCodeStatus}
                resendCooldownTime={resendCooldownTime}
                bind:input={verifField}
                bind:value={verifCode}
                on:submit={checkVerificationCode}
                on:resend-code={resendVerificationCode}
            />
        </section>

        <section id="password" class="flow-content {navStep === 5 ? "visible" : ""} {navStep > 5 ? "left" : "right"}">
            <PasswordFC bind:input={passwordField} bind:value={passwordValue} />
        </section>
    </section>

    <!-- Normal nav buttons -->
    <section
        bind:this={navContainer}
        id="nav-button-container"
        style="transform: translateY({navHeight}px); opacity: {navStep === 5 ? "0" : "1"}; pointer-events: {navStep === 5 ? "none" : "all"};"
    >
        <button disabled={!leftClickable} id="left" class="text" type="reset" on:click={navLeft}>
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <g id="Icons-/-arrow-circle-right" stroke="currentColor" stroke-width="1.75">
                        <path d="M12.875,15.4999998 L16.375,11.9999998 M16.375,11.9999998 L12.875,8.4999998 M16.375,11.9999998 L7.625,11.9999998 M22.5,12 C22.5,15.7512886 20.4987114,19.2176223 17.25,21.0932667 C14.0012887,22.9689111 9.99871128,22.9689111 6.74999995,21.0932667 C3.50128863,19.2176223 1.5,15.7512886 1.5,12 C1.5,6.20101001 6.20101021,1.5 12,1.5 C17.7989898,1.5 22.5,6.20101001 22.5,12 L22.5,12 Z" id="Shape" transform="translate(12, 12) scale(-1, 1) translate(-12, -12)"></path>
                    </g>
                </g>
            </svg>
        </button>

        <button disabled={!rightClickable} id="right" class="text" type="submit" on:click={navRight}>
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <g id="Icons-/-arrow-circle-right" stroke="currentColor" stroke-width="1.75">
                        <path d="M12.875,15.4999998 L16.375,11.9999998 M16.375,11.9999998 L12.875,8.4999998 M16.375,11.9999998 L7.625,11.9999998 M22.5,12 C22.5,15.7512886 20.4987114,19.2176223 17.25,21.0932667 C14.0012887,22.9689111 9.99871128,22.9689111 6.74999995,21.0932667 C3.50128863,19.2176223 1.5,15.7512886 1.5,12 C1.5,6.20101001 6.20101021,1.5 12,1.5 C17.7989898,1.5 22.5,6.20101001 22.5,12 L22.5,12 Z" id="Shape"></path>
                    </g>
                </g>
            </svg>
        </button>
    </section>
</main>

<style lang="scss">
    @import "$static/stylesheets/guideline";

    main {
        width: 100%; height: calc(100vh - 2 * $navbar-height);
        display: flex; justify-content: center; align-items: center;
        
        #flow-content-container{
            width: 100%; height: 100%;

            display: flex; justify-content: center; align-items: center;

            .flow-content{
                position: fixed;
                display: flex; justify-content: center; align-items: center; flex-direction: column;
                width: calc(100% - 40px); max-width: 600px;
                
                opacity: 0;
                pointer-events: none;
                
                transition: opacity 300ms ease-in-out, transform 700ms $out-generic;
                transform: translateX(0px);
                
                &.left{
                    transform: translateX(-700px);
                }
                &.right{
                    transform: translateX(700px);
                }
                &.visible{
                    opacity: 1;
                    pointer-events: all;
                    transform: translateX(0px);
                }
            }
        }
        
        #nav-button-container{
            position: absolute;

            opacity: 1;
            
            transition: opacity 350ms $out-generic, transform 700ms $out-generic;
            
            button{
                width: 24px; height: 24px;
                border-radius: 24px;
                
                opacity: 1;

                transition: opacity 250ms ease-in-out;

                &#left{
                    margin-right: 36px;
                }

                &:disabled{
                    opacity: 0.5;
                    color: $tertiary;
                    pointer-events: none;
                }
            }
        }
    }
</style>