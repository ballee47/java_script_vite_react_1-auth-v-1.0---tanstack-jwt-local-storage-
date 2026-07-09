import { useEffect } from "react";
import EventBus from "./EventBus";

export function useSubscribe(
    event: string,
    callback: (payload: unknown) => void
) {
    useEffect(() => {

        EventBus.on(event, callback);

        return () => EventBus.off(event, callback);

    }, [event, callback]);
}