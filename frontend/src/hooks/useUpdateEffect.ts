import {useEffect, useState} from "react";

export const useUpdateEffect = (effect, deps) => {
    const [initialMount, setInitialMount] = useState<boolean>(true);

    useEffect(() => {
        if (initialMount) {
            setInitialMount(false);
        } else {
            return effect();
        }
    }, deps);
}