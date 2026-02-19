import { useState, useEffect } from "react"

type ToastProps = {
    title?: string
    description?: string
    variant?: "default" | "destructive"
}

type ToastActionInfo = {
    id: string
} & ToastProps

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

// Simple useToast hook for now
const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

interface State {
    toasts: ToastActionInfo[]
}

function dispatch(action: any) {
    memoryState = reducer(memoryState, action)
    listeners.forEach((listener) => {
        listener(memoryState)
    })
}

const reducer = (state: State, action: any): State => {
    switch (action.type) {
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            }
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t) =>
                    t.id === action.toast.id ? { ...t, ...action.toast } : t
                ),
            }
        case "DISMISS_TOAST": {
            const { toastId } = action

            // ! Side effects ! - This could be extracted into a dismissToast() action,
            // but I'll keep it here for simplicity
            if (toastId) {
                // addToRemoveQueue(toastId)
            } else {
                state.toasts.forEach((toast) => {
                    // addToRemoveQueue(toast.id)
                })
            }

            return {
                ...state,
                toasts: state.toasts.filter((t) => t.id !== toastId || toastId === undefined),
            }
        }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: [],
                }
            }
            return {
                ...state,
                toasts: state.toasts.filter((t) => t.id !== action.toastId),
            }
    }
    return state
}

function toast({ ...props }: ToastProps) {
    const id = genId()

    const update = (props: ToastProps) =>
        dispatch({
            type: "UPDATE_TOAST",
            toast: { ...props, id },
        })
    const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open: boolean) => {
                if (!open) dismiss()
            },
        },
    })

    return {
        id: id,
        dismiss,
        update,
    }
}

function useToast() {
    const [state, setState] = useState<State>(memoryState)

    useEffect(() => {
        listeners.push(setState)
        return () => {
            const index = listeners.indexOf(setState)
            if (index > -1) {
                listeners.splice(index, 1)
            }
        }
    }, [state])

    return {
        ...state,
        toast,
        dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    }
}

let count = 0

function genId() {
    count = (count + 1) % Number.MAX_VALUE
    return count.toString()
}

export { useToast, toast }
