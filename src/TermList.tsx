import FancyCheckbox from "./FancyCheckbox";
import './Contract.css'

export default function TermList(props: {terms: string[], repl: any, startAt: number}) {
    function handleReplacements(term: string, repl: any) {
        if(!term.match(/{.*}/i)) {
            // only handle terms in the format:
            // {EXAMPLE_TERM}
            return <span>{term} </span>
        }

        let classes = ""
        Object.keys(repl).forEach(key => {
            term = term.replace("{" + key + "}", repl[key])
            if(term.indexOf(":NAME") > -1) {
                classes += " stripy-bg"
                term = term.replace(":NAME", "")
            }
        })

        return <span className={classes}>{term} </span>
    }

    function RenderTerm(props: {term: string, repl: any}) {
        let els = props.term.split("\n").map((t, i) => {
            return <p key={i}>{t.split(" ").map(term => handleReplacements(term, props.repl))}</p>
        })
        return els
    }

    return (
        <table className="term-table">
            <tbody>
                {
                    props.terms.map((term, i) => <tr key={i} className="term-row">
                        <td>
                            {i + props.startAt + 1}.
                        </td>
                        <td>
                            <RenderTerm term={term} repl={props.repl} />
                            </td>
                        <td>
                            <FancyCheckbox />
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    )
}