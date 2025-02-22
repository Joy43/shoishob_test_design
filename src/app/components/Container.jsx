import { twMerge } from "tailwind-merge"


const Container = ({children,className}) => {
  return (
    <div className={twMerge("max-w-[1140px] mx-auto px-4",className)}>

{children}
    </div>
  )
}

export default Container