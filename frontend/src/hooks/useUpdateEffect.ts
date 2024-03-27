import {useEffect, useState} from "react";

export const useUpdateEffect = (effect, deps) => {
    const [initialMount, setInitialMount] = useState(true);

    useEffect(() => {
        if (initialMount) {
            setInitialMount(false);
        } else {
            return effect();
        }
    }, deps);
}