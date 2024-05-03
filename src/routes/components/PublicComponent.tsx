import Template from "./../template"

interface Props {
    comp: any
}

const PublicComponent = ({comp: Component}: Props) => {
    return (
        <Template>
            <Component />
        </Template>
    )
}

export default PublicComponent