import { useState, useEffect } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import axios from "axios"

const LinkResult = ({ inputValue }) => {
    const [shortenLink, setShortenLink] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios(`https://api.shrtco.de/v2/shorten?url=${inputValue}`);
                if(res)
                    setShortenLink(res.data.result.full_short_link);
            } 
            catch (err) {
                // setShortenLink("");
                setError(err);
                setTimeout(()=>{setError(false)},3000)
            } 
            finally {
                setLoading(false);
            }
        }
        if (inputValue.length) {
            fetchData();
        }
    }, [inputValue]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setCopied(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [copied])

    if (loading) {
        return <p className="noData">Loading...</p>
    }
    if (error) {
        return <p className="noData">Something went wrong :( <br /> Check you URL format - Reload - Shorten your URL n Enjoy! :)</p>
    }


    return (
        <> {/* if shortenlink has value then only render the div "result" other wise return error msg so used &&*/}
            {shortenLink && (
                <div className="result">
                    <p>{shortenLink}</p>
                    <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)} >
                        <button className={copied ? "copied" : ""}>Copy to Clipboard</button>
                    </CopyToClipboard>
                </div>
            )}
        </>
    )
}

export default LinkResult