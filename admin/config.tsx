// admin/config.tsx
/** @jsxRuntime classic */
/** @jsx jsx */
import { AdminConfig } from '@keystone-6/core/types';
import { jsx } from '@keystone-ui/core';
import customIcon from"../image/Icon.png";

function CustomLogo () {
    const config = <a href="https://www.chacrasoftware.com/">
    <img css = {{display: "inline-block", width: "250px", height: "auto"}} src={customIcon.src} alt="Chacra Software"/>
  </a>
    // return <img css = {{display: "inline-block", width: "250px", height: "auto"}} src = "image/Icon.png" alt = "Chacra Software"/>
    return config;
}
export const components: AdminConfig['components'] = {
    Logo: CustomLogo
}