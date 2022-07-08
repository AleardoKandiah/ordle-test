import { useContext, useEffect, useState } from "react";



const CopyLink = () {
    const {solutionWord} = useContext(SolutionWordContext);
    const link = `${window.location.href}?word=${encodedURIComponent(
        // buffer for base64 encoding into base64
        Buffer.from(solutionWord).toString("base64")
    )}`;


    const [recentlyCopied, setRecentlyCopied] = useState(false);

    // check icon reset to copy icon after 1s
    useEffect(() => {
        if(recentlyCopied) {
            const timeout = setTimeout(() => {
                setRecentlyCopied(flase);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [recentlyCopied]);

    return (
        <div className="inline-flex items-center gap-2">
            <div className="">{link}</div>
            <button
            onClick={() => {
                navigator.clipboard.writeText(link);
                setRecentlyCopied(true);
            }}
            className="hover:text-stone-700 p-1"
            aria-label="Copy link"
            >
              {!recentlyCopied ? <CopySvg/> : <CheckSvg />}
            </button>
        </div>
    )
}