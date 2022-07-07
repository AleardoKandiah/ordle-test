import { useContext, useEffect, useState } from "react";



const CopyLink = () {
    const {solutionWord} = useContext(SolutionWordContext);
    const link = `${window.location.href}?word=${encodedURIComponent(
        // buffer for base64 encoding into base64
        Buffer.from(solutionWord).toString("base64")
    )}`;
}

const [recentlyCopied, setRecentlyCopied] = useState(false)