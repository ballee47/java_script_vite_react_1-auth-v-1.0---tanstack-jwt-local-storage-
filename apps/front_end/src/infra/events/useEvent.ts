import EventBus from "./EventBus";

export function useEvent() {

    return {

        emit: EventBus.emit.bind(EventBus),

        on: EventBus.on.bind(EventBus),

        off: EventBus.off.bind(EventBus)

    };

}