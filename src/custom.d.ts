import { CSSProperties } from "react";

declare module "react" {
    interface CSSProperties {
        webkitBackgroundClip?: string;
        webkitTextFillColor?: string;
    }
}