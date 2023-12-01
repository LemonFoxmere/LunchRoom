<script lang="ts">
	import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";

    const disp = createEventDispatcher();

    // create external binding for ease of access
    export let input: HTMLInputElement | null = null;
    export let value: string = "";
    export let disabled: boolean = false;

    let v1Field: HTMLInputElement;
    let v2Field: HTMLInputElement;
    let v3Field: HTMLInputElement;
    let v4Field: HTMLInputElement;
    let v5Field: HTMLInputElement;
    let v6Field: HTMLInputElement;
    let fieldList: HTMLInputElement[]

    // hard program in these inputs because it's easier
    onMount(() => {
        fieldList = [v1Field, v2Field, v3Field, v4Field, v5Field, v6Field];
        
        // add event listeners to each input field
        for(let i = 0; i < fieldList.length; i++) {
            const field = fieldList[i];

            field.oninput = () => {
                field.value = field.value.toUpperCase().replace(/[^A-Z0-9]/g, "").charAt(0); // prevent erroneous input

                if(field.value.length !== 0 && i + 1 !== fieldList.length) fieldList[i + 1].focus(); // advance to next field. We control that here so it work with autofills
            }

            field.onkeydown = (e: KeyboardEvent) => {
                if(disabled){
                    e.preventDefault();
                    return;
                }

                if( /^[a-zA-Z0-9]$/.test(e.key) || e.key === "ArrowRight" || (e.key === "Tab" && !e.shiftKey) ){
                    if(i + 1 !== fieldList.length){
                        // field.blur();
                        setTimeout(() => { // wait for default event to pass first
                            if(/^[a-zA-Z0-9]$/.test(e.key)) field.value = `${e.key}`.toUpperCase();
                            if(e.key === "ArrowRight" || (e.key === "Tab" && !e.shiftKey)) fieldList[i + 1].focus();
                        }, 0);
                    }
                } else if ( e.key === "ArrowLeft" || e.key === "Backspace" || (e.key === "Tab" && e.shiftKey) ) {
                    if(i !== 0){
                        // field.blur();
                        setTimeout(() => { // wait for default event to pass first
                            if(e.key === "Backspace") field.value = "";
                            fieldList[i - 1].focus();
                        }, 0);
                    }
                }

                setTimeout(() => {
                    // update binder value to reflect changes
                    value = fieldList.map(field => field.value).join("");
    
                    // once the binder value is 6 characters long, blur everything and dispatch a submit event
                    if(value.length === 6) {
                        field.blur();
                        disp("submit");
                    }
                }, 0);
            };

            field.onpaste = async (e: ClipboardEvent) => {
                e.preventDefault();

                let pastedText = e.clipboardData?.getData("text") || null;
                
                if(pastedText === null) return;

                // on pasting the code, weed out any non-alphanumeric characters first
                pastedText = pastedText.toUpperCase().replace(/[^A-Z0-9]/g, "");
                // trim the text to 6 characters long
                pastedText = pastedText.substring(0, 6);

                if(pastedText.length === 0) return;

                // update the bidner input and fill in all fieldlist and unfocus all fields
                value = pastedText;
                
                if(pastedText.length === 6) disp("submit"); // emit the submit event
                
                for(let i = 0; i < fieldList.length; i++) {
                    fieldList[i].value = pastedText.charAt(i);
                    fieldList[i].blur();
                    // stagger 10ms for animation purposes
                    await new Promise(r => setTimeout(r, 10));
                }
            }
        }

        // add observer functions to the external binder field
        if(input !== null) input.onfocus = (e: FocusEvent) => {
            e.preventDefault();
            v1Field.focus();
        }
    })

    $: if(value === "" && !!fieldList){ // used for clearing the values
        for(let i = 0; i < fieldList.length; i++) fieldList[i].value = "";
    }
</script>

<main>
    <input bind:this={v1Field} type="text" class="monospace" placeholder=" " disabled={disabled}>
    <input bind:this={v2Field} type="text" class="monospace" placeholder=" " disabled={disabled}>
    <input bind:this={v3Field} type="text" class="monospace" placeholder=" " disabled={disabled}>
    <input bind:this={v4Field} type="text" class="monospace" placeholder=" " disabled={disabled}>
    <input bind:this={v5Field} type="text" class="monospace" placeholder=" " disabled={disabled}>
    <input bind:this={v6Field} type="text" class="monospace" placeholder=" " disabled={disabled}>

    <input id="psuedo" bind:this={input} bind:value={value} type="text">
</main>

<style lang="scss">
    @import "$static/stylesheets/guideline";

    main{
        display: flex; justify-content: center; align-items: center;
        width: 100%; height: 50px;

        input{
            width: 48px; height: 48px;
            margin-right: 20px;
            outline: none;

            display: flex; justify-content: center; align-items: center;
            text-align: center;
            font-size: calc(16px);
            font-weight: 600;
            color: $white;

            transition: color 700ms $out-cubic;

            &:last-child{
                margin-right: 0;
            }

            &:not(:placeholder-shown) {
                color: $black;
            }

            &#psuedo{
                display: none;
                pointer-events: none;
            }
        }
    }
</style>