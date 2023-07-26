import { ReactNode } from "react";
import styles from "./index.module.sass";

const PageTitle = ({ className, children }: { className?: string, children: ReactNode | string }) => {
    return <h3 className={`${className} ${styles.title}`}>{children}</h3>
}

export default PageTitle;
