export default function SignatureLine() {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <h3 style={{width: '100%', textAlign: 'center'}}>
                Sign here to acknowledge your understanding and acceptance of these terms
            </h3>
            <div style={{display: 'flex', flexDirection: 'row', height: '80px', marginLeft: '10px'}}>
                <div style={{flexBasis: '90%', backgroundColor: '#fff5e9'}}>
                    <div style={{borderBottom: 'solid', borderColor: '#b72650', position: 'relative', top: '70px', margin: '0 10px'}}>
                        
                    </div>
                </div>

                <div style={{flexBasis: '10%', marginLeft: '20px', marginRight: '10px', marginBottom: '30px', maxWidth: '90px'}} className="checkered-bg">
                    <span style={{position: 'relative', top: '55px'}}>BIOMETRIC</span>
                </div>
            </div>
        </div>
    )
}