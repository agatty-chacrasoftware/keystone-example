// admin/config.tsx
/** @jsxRuntime classic */
/** @jsx jsx */
import { AdminConfig } from '@keystone-6/core/types';
import { jsx } from '@keystone-ui/core';

function CustomLogo () {
    return <img css = {{display: "inline-block", width: "250px", height: "auto"}} src = "https://outwardhound.com/furtropolis/wp-content/uploads/2020/03/Doggo-Lingo-Post.jpg" alt = "Chacra Software"/>
}
export const components: AdminConfig['components'] = {
    Logo: CustomLogo
}