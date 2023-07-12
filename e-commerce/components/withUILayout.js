
import UILayout from './uiLayout'


export default function withUILayout(Component) {
    return props => (

        <UILayout>
            <Component {...props} />
        </UILayout>
    )
}
