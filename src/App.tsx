import { useState } from 'react'
import Contract from './Contract'
import './App.css'
import { UserEditor, CustomData } from './UserEditor'

export default function App() {
  const [showEditor, setShowEditor] = useState(false)

  const [data, setData] = useState<CustomData>({
    affiniFirstName: "Akash",
    affiniLastName: "Nele",
    affiniNumber: "First",
    affiniPronouns: "she/her",
    floretName: "Elvira",
    floretNumber: "Second",
    standardTerms: [
      "Above all else, you, {FLORET_SHORT}:NAME, must obey your Guardian, {AFFINI_FULL}:NAME in all things. This is for your safety, wellbeing, and care.", 
      "Your Guardian, {AFFINI_FULL}:NAME, owns you. You are {AFFINI_PRONOUN_OBJ} property. You do not have political rights in the Affini Compact.", 
      "You do have a guarantee of your wellbeing, as defined in {SECTION} 57 of the Human Domestication Treaty.", 
      "This guarantee of wellbeing does not proclude your Guardian from disciplining you, as outlined in {SECTION} 61 of the Human Domestication Treaty.",
      "As the property of your Guardian, {AFFINI_PRONOUN_SBJ} may add, remove, or modify conditions of your wardship at any time for any reason within the limits established by the Human Domestication Treaty.",
      "Your full name is {FLORET_FULL}:NAME from this moment forward."
    ],
    extraTerms: []
  })

  function toggleEditor() {
    console.log("toggle editor")
    setShowEditor(!showEditor)
  }

  return (
    <>
      <div>
        <button style={{position: 'absolute', left: '10px', top: '10px'}} onClick={toggleEditor}>{showEditor ? "View" : "Edit"}</button>
      </div>

      <div className='flex-ctr'>
        {showEditor ? 
          <UserEditor data={data} setData={setData} />
        : 
          <Contract 
            floretName={data.floretName}
            floretNumber={data.floretNumber}
            affiniFirstName={data.affiniFirstName}
            affiniLastName={data.affiniLastName}
            affiniNumber={data.affiniNumber}
            affiniPronouns={data.affiniPronouns}
            standardTerms={data.standardTerms} 
            extraTerms={data.extraTerms} />
          }
      </div>
    </>
  )
}
