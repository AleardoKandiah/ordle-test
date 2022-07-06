import { useContext, useEffect, useState } from "react";



const CopyLink = () {
    const {solutionWord} = useContext(SolutionWordContext);
    const link = `${window.location.href}?word=${encodedURIComponent(
        Buffer.from(solutionWord).toString("base64")
    )}`;
}