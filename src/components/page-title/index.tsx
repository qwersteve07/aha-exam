import { ReactNode } from "react";

const PageTitle = ({ className, children }: { className?: string, children: ReactNode | string }) => {
    return <h3 className={`${className} text-white mt-0 mx-0 mb-[20px] text-2xl font-normal md:mb-[24px]`}>{children}</h3>
}

export default PageTitle;
