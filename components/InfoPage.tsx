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
}