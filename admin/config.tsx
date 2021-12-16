// admin/config.tsx
/** @jsxRuntime classic */
/** @jsx jsx */
import { AdminConfig } from '@keystone-6/core/types';
import { jsx } from '@keystone-ui/core';

function CustomLogo () {
    return <img css = {{display: "inline-block", width: "250px", height: "auto"}} src = "https://res.cloudinary.com/hfq3eckim/image/upload/v1639597017/chacrasoftware-logo_lyn9s5.png" alt = "Chacra Software"/>
}
export const components: AdminConfig['components'] = {
    Logo: CustomLogo
}