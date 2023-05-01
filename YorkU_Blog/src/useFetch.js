import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);

    const [isPending, setIsPending] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        const abortCont = new AbortController();


        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })    //associate the Abort Controller with the fetch
                .then(res => {
                    if (!res.ok) {
                        throw Error("Could not fetch the data for the resource.");
                    }
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {

                    //If we catch a abort error, we might not be updating the data anymore.
                    if (err.name === "AbortError") {
                        console.log("fetch aborted");
                    }
                    else {
                        setError(err.message);
                        setIsPending(false);
                    }

                })
        }, 1000);

        /*clean up function:

        */

        return () => abortCont.abort();
    }, [url]);
    //[] (dependency array) make sure the function only run after the first render.
    //if we want useEffect() run after some specific value changed, we can add the variable to the [].

    return { data, isPending, error };

}

export default useFetch;