import { createRef, Dispatch, SetStateAction } from "react";

export interface CustomData {
    floretName: string,
    floretNumber: string,
    affiniFirstName: string,
    affiniLastName: string,
    affiniNumber: string,
    affiniPronouns: string

    standardTerms: string[],
    extraTerms: string[]
}

export function UserEditor(props: {data: CustomData, setData: Dispatch<SetStateAction<CustomData>>;}) {
    const floretNameInput = createRef<HTMLInputElement>()
    const floretNumberInput = createRef<HTMLInputElement>()

    const affiniFirstNameInput = createRef<HTMLInputElement>()
    const affiniLastNameInput = createRef<HTMLInputElement>()
    const affiniNumberInput = createRef<HTMLInputElement>()
    const affiniPronounsInput = createRef<HTMLInputElement>()

    function updateInputs() {
        // console.log("Update inputs!", props.data)
        props.setData({
            floretName: floretNameInput.current?.value ?? "",
            floretNumber: floretNumberInput.current?.value ?? "",

            affiniFirstName: affiniFirstNameInput.current?.value ?? "",
            affiniLastName: affiniLastNameInput.current?.value ?? "",
            affiniNumber: affiniNumberInput.current?.value ?? "",
            affiniPronouns: affiniPronounsInput.current?.value ?? "",

            standardTerms: props.data.standardTerms,
            extraTerms: props.data.extraTerms
        })

        localStorage.setItem("hdgm-data", JSON.stringify(props.data))
        console.log("saved to localStorage")
    }

    function updateTerms(obj: CustomData) {
        props.setData(obj)
        localStorage.setItem("hdgm-data", JSON.stringify(props.data))
        console.log("saved to localStorage")
    }

    async function loadFromClipboard() {
        try {
            let text = await navigator.clipboard.readText()
            props.setData(JSON.parse(text))
        } catch(e) {
            console.error("clipboard error", e)
            alert("Failed to read from the clipboard!")
        }
    }

    async function saveToClipboard() {
        try {
            let text = JSON.stringify(props.data)
            await navigator.clipboard.writeText(text)
        } catch(e) {
            console.error("clipboard error", e)
            alert("Failed to copy to the clipboard!")
        }
    }

    return <>
        <div>
            <h1>Edit your contract...</h1>

            <h3>Your floret's info:</h3>
            <input ref={floretNameInput} placeholder="Your floret's name" value={props.data.floretName} onChange={updateInputs} /> , &nbsp;
            <input ref={floretNumberInput} placeholder="Your floret's number" value={props.data.floretNumber} onChange={updateInputs} /> Floret
            <br />

            <h3>Your info:</h3>
            <input ref={affiniFirstNameInput} placeholder="First name" value={props.data.affiniFirstName} onChange={updateInputs} />
            <input ref={affiniLastNameInput} placeholder="Last name" value={props.data.affiniLastName} onChange={updateInputs} /> , &nbsp;
            <input ref={affiniNumberInput} placeholder="Bloom number" value={props.data.affiniNumber} onChange={updateInputs}/> Bloom, &nbsp;
            <input ref={affiniPronounsInput} placeholder="Pronouns (subj/obj)" value={props.data.affiniPronouns} onChange={updateInputs} />

            <h3>Your extra terms:</h3>
            <ul style={{listStyle: 'none'}}>
                {props.data.extraTerms.map((term, idx) =>
                   <li>
                        <input value={term} onChange={e => updateTerms({...props.data, extraTerms: [...props.data.extraTerms.map((orig, i) => i == idx ? e.target.value : orig)]})} />
                        <button onClick={() => updateTerms({...props.data, extraTerms: [...props.data.extraTerms.filter((_, i) => i != idx)]})}>Remove</button>
                   </li> 
                )}
            </ul>
            <button onClick={() => updateTerms({...props.data, extraTerms: [...props.data.extraTerms, "New Term"]})}>Add...</button>

            <h3>&nbsp;</h3>
            <h3>Save/load:</h3>

            <button onClick={saveToClipboard}>Copy to clipboard</button><br />
            <button onClick={loadFromClipboard}>Load from clipboard</button><br />
        </div>
    </>
}