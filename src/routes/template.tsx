import React, { ReactNode } from "react"

interface Props {
    children?: ReactNode
}

const Template = ({ children }: Props) => {
    return (
        <div className="w-screen h-screen relative flex flex-col overflow-hidden hide-scroll p-0 m-0">
            {children}
        </div>
    )
}

export default Template