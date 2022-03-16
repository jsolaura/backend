import React, {useEffect, useState} from 'react';
import defaultAxios from 'axios';

const useAxios = (options, axiosInstance = defaultAxios) => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null
    });
    const [trigger, setTrigger] = useState(0);
    const reFetch = () => {
        setState({
            ...state,
            loading: true,
        });
        setTrigger(new Date());
    }
    useEffect(() => {
        if (!options.url) {
            return;
        }
        axiosInstance(options)
            .then(data => {
                setState({
                    ...state,
                    loading: false,
                    data
                })
            })
            .catch(error => {
                setState({ ...state, loading: false, error });
            });
    }, [trigger]);

    return { ...state, reFetch };
};

// ex
// const { loading, data, error, reFetch } = useAxios({ url: "https://yts.mx/api/v2/list_movies.json" });
// return (
//     <div>
//         <h1>{data && data.status}</h1>
//         <h2>{loading && "Loading" }</h2>
//         <button onClick={reFetch}>ReFetch</button>
//     </div>
// );

export default useAxios;