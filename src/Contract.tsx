import SignatureLine from './SignatureLine'
import TermList from './TermList'
import CompactLogo from './assets/compact_icon.webp'

interface ComponentProps {
    floretName: string,
    floretNumber: string,
    affiniFirstName: string,
    affiniLastName: string,
    affiniNumber: string,
    affiniPronouns: string

    standardTerms: string[],
    extraTerms: string[]
}

export default function Contract(props: ComponentProps) {
    let replacementObj = {
        SECTION: "§",
        FLORET_SHORT: props.floretName,
        FLORET_FULL: `${props.floretName} ${props.affiniLastName}, ${props.floretNumber} Floret`,
        AFFINI_FULL: `${props.affiniFirstName} ${props.affiniLastName}, ${props.affiniNumber} Bloom`,
        AFFINI_PRONOUN_SBJ: props.affiniPronouns.split("/")[0],
        AFFINI_PRONOUN_OBJ: props.affiniPronouns.split("/")[1]
    }

    return <>
        <div className='grid-outer'>
            <div className='contract-header'>
                <img src={CompactLogo} className='compact-icon' />
                <h3 className='contract-title'>HUMAN DOMESTICATION CONTRACT</h3>
                <img src={CompactLogo} className='compact-icon' />
            </div>

            <div style={{gridRow: 2}}>
                <TermList terms={props.standardTerms} startAt={0} repl={replacementObj} />
            </div>

            {props.extraTerms.length > 0 ? <>
                <div style={{gridRow: 3}}>
                    <h3>
                        Additional terms that your Guardian, 
                        <span className='stripy-bg'>{props.affiniFirstName} {props.affiniLastName}, {props.affiniNumber} Bloom</span>
                        has stipulated
                    </h3>
                </div>

                <div style={{gridRow: 4}}>
                    <TermList terms={props.extraTerms} startAt={props.standardTerms.length} repl={replacementObj} />
                </div>
            </> : <></>}

            <div style={{gridRow: 5}}>
                <SignatureLine />
            </div>
        </div>
    </>
}