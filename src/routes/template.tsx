import React, { ReactNode } from "react"

interface Props {
    children?: ReactNode
}

const Template = ({ children }: Props) => {
    return (
        <div className="w-screen h-screen relative flex flex-col hide-scroll p-0 m-0 bg-red">
            {children}
        </div>
    )
}

export default Template