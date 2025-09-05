interface TransitionButton {
    text: string;
    href?: string;
    className?: string; // optional className prop
    click?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * 색상 속성 필요함
 * */
const SimpleButton = ({text, className = '', href, click}: TransitionButton) => {
    return (
        <a
            onClick={click}
            className={`cursor-pointer transition-all duration-75 ease-in-out rounded-md py-2 ${className}`}
            href={href}
        >
            <div className="ml-4 mr-4">{text}</div>
        </a>
    );
};

export {SimpleButton};
