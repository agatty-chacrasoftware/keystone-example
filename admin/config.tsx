// admin/config.tsx
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';
import CustomIcon from "../image/Icon.png";

function CustomLogo () {
    return <img css = {{display: "inline-block", width: "250px", height: "auto"}} src = {CustomIcon.src} alt = "Image not found"/>
}
export const components = {
    Logo: CustomLogo
}