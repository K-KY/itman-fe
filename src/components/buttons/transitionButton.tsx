interface TransitionButton {
    text: string;
    className?: string; // optional className prop
}

/**
 * 색상 속성 필요함
 * */
const TransitionButton = ({ text, className = '' }: TransitionButton) => {
    return (
        <a
            className={`transition-all duration-75 ease-in-out rounded-md py-2 ${className}`}
            href="/"
        >
            <div className="ml-4 mr-4">{text}</div>
        </a>
    );
};

export { TransitionButton };
