import React from 'react'
import { Loader, Dimmer } from 'semantic-ui-react'

export const Loading = () => {
    return (
        <Dimmer active>
            <Loader size="huge" content="Preparing..." />
        </Dimmer>
    )
}
